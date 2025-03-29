import { CUSTOM_PACKET_DISCIPLINE_INFO_OPCODE, CustomPacketDisciplineInfo } from "../../shared/custom-packets/CustomPacketDisciplineInfo";

import { ORMDisciplines } from "./ORMDisciplines";
import { ORMDisciplinesXP } from "./ORMDisciplinesXP";



export namespace ORMDisciplinesManager {

    export function init () {

        createDisciplines();

    }

    export function registerEvents (events: TSEvents) {
        
        events.CustomPacket.OnReceive(CUSTOM_PACKET_DISCIPLINE_INFO_OPCODE, (opcode, packet, player) => {
            
            let customPacketRequest = new CustomPacketDisciplineInfo(0, "", "");
            customPacketRequest.read(packet);

            const disciplineID = customPacketRequest.ID;
            if ( !disciplineID ) return;

            const disciplineEntry = ORMDisciplines.load(customPacketRequest.ID);
            if ( !disciplineEntry || !disciplineEntry.isEnabled ) return;

            const disciplineXPEntry = ORMDisciplinesXP.load(player);
            
            let disciplineXP = -1;
            switch ( disciplineID ) {
                case 1: disciplineXP = disciplineXPEntry.discipline1XP; break;
                case 2: disciplineXP = disciplineXPEntry.discipline2XP; break;
                case 3: disciplineXP = disciplineXPEntry.discipline3XP; break;
                case 4: disciplineXP = disciplineXPEntry.discipline4XP; break;
                case 5: disciplineXP = disciplineXPEntry.discipline5XP; break;
                case 6: disciplineXP = disciplineXPEntry.discipline6XP; break;
            }

            // Set default packet data to vague information, update only if the player has actually unlocked the Discipline.

            let title       = "";
            let description = disciplineEntry.discoveryHint;
            
            if ( disciplineXP >= 0 ) {
                title       = disciplineEntry.title;
                description = disciplineEntry.description;
            }
            
            let customPacket = new CustomPacketDisciplineInfo(disciplineEntry.ID, title, description);
            customPacket.write().SendToPlayer(player);

        });

    }



    // TODO: Probably better to move functions that create DB data "staticly" so some other file, like "createDBData.ts" or something.

    function createDisciplines () {
        
        const forceSave = false;

        let discipline1 = ORMDisciplines.load(1);
        if ( forceSave || discipline1.machineName.length <= 0) {
            discipline1.machineName     = "discipline1";
            discipline1.isEnabled       = 1;
            discipline1.title           = "Wayfarer";
            discipline1.description     = "The road never truly ends, only turns. A Wayfarer does not seek a home, but the journey itself. They learn from the lands they walk, from the people they meet, and from the endless horizon ahead. To them, stillness is stagnation, and movement is life.";
            discipline1.discoveryHint   = "\"There is wisdom in the roads less traveled. Follow a path that others overlook, and let your feet decide where home truly is.\"";
            discipline1.Save();
        }

        let discipline2 = ORMDisciplines.load(2);
        if ( forceSave || discipline2.machineName.length <= 0 ) {
            discipline2.machineName     = "discipline2";
            discipline2.isEnabled       = 1;
            discipline2.title           = "Ascetic";
            discipline2.description     = "To master oneself is to master all. The Ascetic sheds the distractions of the world — wealth, power, indulgence — to seek clarity through discipline. They walk the razor’s edge of self-denial, finding strength not in what they take, but in what they refuse.";
            discipline2.discoveryHint   = "\"Seek silence where voices fade, where hunger is met with patience, and where the world offers nothing but solitude.\"";
            discipline2.Save();
        }

        let discipline3 = ORMDisciplines.load(3);
        if ( forceSave || discipline3.machineName.length <= 0 ) {
            discipline3.machineName     = "discipline3";
            discipline3.isEnabled       = 1;
            discipline3.title           = "Wildcaller";
            discipline3.description     = "The wind, the rivers, the beasts—they do not obey. They simply are. A Wildcaller is one with the untamed, moving with the heartbeat of nature itself. They do not rule the wilds; they listen to them. And in return, the wilds listen back.";
            discipline3.discoveryHint   = "\"The world speaks, but only those who walk beyond the walls can hear its voice. Listen where the trees are tallest, where the rivers run free.\"";
            discipline3.Save();
        }

        let discipline4 = ORMDisciplines.load(4);
        if ( forceSave || discipline4.machineName.length <= 0 ) {
            discipline4.machineName     = "discipline4";
            discipline4.isEnabled       = 1;
            discipline4.title           = "Tempest";
            discipline4.description     = "Chaos is not destruction—it is change. A Tempest does not control the storm; they embrace it, letting it shape them as the wind shapes the mountains. To them, movement is power, unpredictability is strength, and stillness is a weakness they will never suffer.";
            discipline4.discoveryHint   = "\"Power is not given. It is taken by those who dare. Seek the heart of the storm, where the sky burns and the wind howls.\"";
            discipline4.Save();
        }

        let discipline5 = ORMDisciplines.load(5);
        if ( forceSave || discipline5.machineName.length <= 0 ) {
            discipline5.machineName     = "discipline5";
            discipline5.isEnabled       = 1;
            discipline5.title           = "Gladiator";
            discipline5.description     = "Glory is not found in words, but in the clash of steel, the test of endurance, the proof of will. A Gladiator is not merely a fighter—they are the battle given form. They do not ask for strength. They take it.";
            discipline5.discoveryHint   = "\"Strength is earned through struggle. Find where warriors gather, where steel meets flesh, where weakness is cast aside.\"";
            discipline5.Save();
        }

        let discipline6 = ORMDisciplines.load(6);
        if ( forceSave || discipline6.machineName.length <= 0 ) {
            discipline6.machineName     = "discipline6";
            discipline6.isEnabled       = 1;
            discipline6.title           = "Paragon";
            discipline6.description     = "The greatest do not lead by command, but by example. A Paragon is more than a warrior, more than a scholar, more than a champion—they are the ideal that others strive to follow. They rise where others fall, hold the line when all hope fades, and shine brightest when the world is at its darkest.";
            discipline6.discoveryHint   = "\"They are not named — they are recognized. Seek where hope wavers, where duty is tested, and stand where others would fall.\"";
            discipline6.Save();
        }

    }

}