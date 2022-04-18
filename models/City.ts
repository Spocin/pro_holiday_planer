import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeDbConnection } from "../config/sequelize/sequelizeDbConnection";

import {generateRequiredMsg, generateLengthMsg, generateCapitalLetterMsg} from "../utils/ModelUtils";
import Country from "./Country";

interface CityAttributes {
    id: number;
    name: string;
    fk_country: string
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface CityInput extends Optional<CityAttributes, 'id'>{}
interface UserOutput extends Required<CityAttributes>{}

class City extends Model<CityAttributes, CityInput> implements CityAttributes {
    public id!: number;
    public name!: string;
    public fk_country!: string;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

City.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: generateRequiredMsg(),
            },
            len: {
                args: [2,200],
                msg: generateLengthMsg(2,200)
            },
            is: {
                args: /([A-Z])\w+/,
                msg: generateCapitalLetterMsg()
            }
        }
    },
    fk_country: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeDbConnection,
    paranoid: true
})

City.belongsTo(Country, {
    as: 'country',
    foreignKey: {
        name: 'id',
        allowNull: false
    }
});

export default City