import City from "../../models/City";
import Country from "../../models/Country";
import {sequelizeDbConnection} from "./sequelizeDbConnection";

const dbInit = async () => {

    /*CONSTRAINTS*/
    Country.hasMany(City, {
        as: 'countries',
        foreignKey: "fk_country",
        constraints: true,
        onDelete: 'CASCADE'
    });

    City.belongsTo(Country, {
        as: 'country',
        foreignKey: 'id'
    });

    await sequelizeDbConnection.sync({
        force: true
    })

    //TODO create rest of the models
}

export {dbInit}