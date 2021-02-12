import Realm from "realm";
import {Event} from "../models/Models";

const config:any = {
    inMemory: true,
    schema: [Event]
}

export function openRealm(){
    try{
        const realm = new Realm(config);
        console.log("succesful connected to database");
        return realm;
    }catch(e){
        console.log(e);   
        return undefined;
    }
}