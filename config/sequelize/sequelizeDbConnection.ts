import {Sequelize} from "sequelize";

const sequelizeDbConnection = new Sequelize('holiday_planner','root','root', {
    dialect: 'mysql',
    host: 'localhost'
});

export {sequelizeDbConnection};