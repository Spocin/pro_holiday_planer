import { DataTypes, Model, Optional} from "sequelize";
import { sequelizeDbConnection } from "../config/sequelize/sequelizeDbConnection";

import {generateLengthMsg, generateRequiredMsg, generateCapitalLetterMsg} from "../utils/ModelUtils";

interface UserAttributes {
    id: number;
    login: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface UserInput extends Optional<UserAttributes, 'id'>{}
interface UserOutput extends Required<UserAttributes>{}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public login!: string;
    public email!: string;
    public password!: string;

    /*TIMESTAMPS*/
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: generateRequiredMsg()
            },
            len: {
                args: [5,200],
                msg: generateLengthMsg(5,200)
            },
            is: {
                args: /([A-Z])\w+/,
                msg: generateCapitalLetterMsg()
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: generateRequiredMsg(),
            },
            len: {
                args: [3,200],
                msg: generateLengthMsg(3,200)
            },
            isEmail: {
                msg: "Has to be a valid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8,255],
                msg: generateLengthMsg(8,255)
            }
        }
    }
}, {
    timestamps: true,
    sequelize: sequelizeDbConnection,
    paranoid: true
});

export default User