import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeDbConnection } from "../config/sequelize/sequelizeDbConnection";

import {generateCapitalLetterMsg, generateLengthMsg, generateRequiredMsg} from "../utils/ModelUtils";

interface ItemAttributes {
    id: number;
    name: string;
    quantity: number;
    isPacked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface ItemInput extends Optional<ItemAttributes, 'id'>{}
interface ItemOutput extends Required<ItemAttributes>{}

class Item extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
    public id!: number;
    public name!: string;
    public quantity!: number;
    public isPacked!: boolean;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Item.init({
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
                args: [3,200],
                msg: generateLengthMsg(3,200)
            },
            is: {
                args: /([A-Z])\w+/,
                msg: generateCapitalLetterMsg()
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: "Has to be positive"
            }
        }
    },
    isPacked: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: true,
    sequelize: sequelizeDbConnection,
    paranoid: true
})

export default Item