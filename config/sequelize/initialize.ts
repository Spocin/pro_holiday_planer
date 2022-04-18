import {sequelizeDbConnection} from "./sequelizeDbConnection";

import User from "../../models/User";


const dbInit = async () => {

    await User.sync({
        force: true
    });
    console.log("Synced User");
}

export {dbInit}

//TODO create rest of the models