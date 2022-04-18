import City from "../../models/City";
import Country from "../../models/Country";
import User from "../../models/User";
import Suitcase from "../../models/Suitcase";

import { sequelizeDbConnection } from "./sequelizeDbConnection";


const dbInit = async () => {

    Country.hasMany(City, {
        as: "countries",
        foreignKey: "fk_country",
        constraints: true,
        onDelete: "CASCADE"
    });

    City.belongsTo(Country, {
        as: "country",
        foreignKey: "fk_country"
    });

    User.hasMany(Suitcase, {
        as: "suitcases",
        foreignKey: "fk_user",
        constraints: true,
        onDelete: "CASCADE"
    });

    Suitcase.belongsTo(User, {
        as: "suitcase_user",
        foreignKey: "fk_user"
    });

    City.hasMany(Suitcase, {
        as: "suitcases",
        foreignKey: "fk_city",
        constraints: true,
        onDelete: "CASCADE"
    });

    Suitcase.belongsTo(City, {
        as: "suitcase_city",
        foreignKey: "fk_city"
    });

    //TODO create rest of constraints and models

    await sequelizeDbConnection.sync({
        force: true
    });
}

export {dbInit}