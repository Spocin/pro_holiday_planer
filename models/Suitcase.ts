import {DataTypes, Model, Op, Optional} from "sequelize";
import {sequelizeDbConnection} from "../config/sequelize/sequelizeDbConnection";

import {generateLengthMsg, generateRequiredMsg} from "../utils/ModelUtils";

interface SuitcaseAttributes {
    id: number;
    name: string;
    fk_city: number;
    fk_user: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface SuitcaseInput extends Optional<SuitcaseAttributes, 'id'> {}
interface SuitcaseOutput extends Required<SuitcaseAttributes>{}

class Suitcase extends Model<SuitcaseAttributes, SuitcaseInput> implements SuitcaseAttributes {
    public id!: number;
    public name!: string;
    public fk_city!: number;
    public fk_user!: number;

    /*TIMESTAMPS*/
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Suitcase.init({
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
                msg: generateRequiredMsg()
            },
            len: {
                args: [3,200],
                msg: generateLengthMsg(3,200)
            }
        }
    },
    fk_city: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    fk_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeDbConnection,
    paranoid: true
});

export default Suitcase