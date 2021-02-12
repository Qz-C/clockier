import { openRealm } from "../db/connection";
import {Event} from "../types"

export const EventController = {
    create(event:Event):void{
        const realm = openRealm();
        realm?.write(()=>{
            try{
                realm.create("Event",  event);
            }catch(e){
                console.error(e)
            }
        })
        realm?.close;
    },
    list():any[]{
        const realm = openRealm();
        const events:any = realm?.objects("Event");
        const sorted = events.sorted("date");
        realm?.close;
        return sorted;
    },
    delete(eventId:string):void{
        const realm = openRealm();

        realm?.write(()=>{
            try{
                const toDetele:any = realm?.objects("Event").filtered(`eventId == '${eventId}'`)
                realm?.delete(toDetele);
            }catch(e){
                console.error(e)
            }  
        })     
        realm?.close;
    }
}



