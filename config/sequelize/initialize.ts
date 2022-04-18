import City from "../../models/City";
import Country from "../../models/Country";

const dbInit = async () => {

    /*CONSTRAINTS*/
    City.belongsTo(Country, {
        as: 'country',
        foreignKey: 'id'
    });

    Country.hasMany(City, {
        as: 'countries',
        foreignKey: "fk_country",
        constraints: true,
        onDelete: 'CASCADE'
    });

    await Country.sync({
        force: true
    });
    console.log("Synced Country");

    await City.sync({
        force: true
    });
    console.log("Synced City");

    //TODO create rest of the models
}

export {dbInit}