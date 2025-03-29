import { ORMDisciplinesManager } from "./orm/ORMDisciplinesManager";
import { ORMDisciplinesXPManager } from "./orm/ORMDisciplinesXPManager";



export function Main (events: TSEvents) {
    
    ORMDisciplinesManager.init();
    ORMDisciplinesManager.registerEvents(events);

    ORMDisciplinesXPManager.init();
    ORMDisciplinesXPManager.registerEvents(events);

}