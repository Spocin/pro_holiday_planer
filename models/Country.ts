import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeDbConnection } from "../config/sequelize/sequelizeDbConnection";

import City from "../models/City";

import {generateCapitalLetterMsg, generateLengthMsg, generateRequiredMsg} from "../utils/ModelUtils";

interface CountryAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface CountryInput extends Optional<CountryAttributes, 'id'>{}
interface CountryOutput extends Required<CountryAttributes>{}

class Country extends Model<CountryAttributes, CountryInput> implements CountryAttributes {
    public id!: number;
    public name!: string;

    /*TIMESTAMPS*/
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Country.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: generateRequiredMsg()
            },
            len: {
                args: [3,200],
                msg: generateLengthMsg(3,200)
            },
            is: {
                args: /([A-Z])\w+/,
                msg: generateCapitalLetterMsg()
            }
        }
    }
}, {
    timestamps: true,
    sequelize: sequelizeDbConnection,
    paranoid: true
});

export default Country