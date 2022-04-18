import {Sequelize} from "sequelize";

const sequelizeDbConnection = new Sequelize('holiday-planer','app','app', {
    dialect: 'mysql',
    host: 'localhost'
});

export {sequelizeDbConnection};