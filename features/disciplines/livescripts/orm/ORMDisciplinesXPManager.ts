import { CUSTOM_PACKET_DISCIPLINE_XP_OPCODE, CustomPacketDisciplineXP } from "../../shared/custom-packets/CustomPacketDisciplineXP";

import { ORMDisciplinesXP } from "./ORMDisciplinesXP";



export namespace ORMDisciplinesXPManager {

    export function init () {

        

    }

    export function registerEvents (events: TSEvents) {
        
        events.Player.OnSave((player) => {
            ORMDisciplinesXP.save(player);
        });

        events.Player.OnDelete((guid) => {
            ORMDisciplinesXP.destroy(CreateGUID(guid, 0));
        });

        events.Player.OnCreatureKill((player, creature) => {

            const entry = ORMDisciplinesXP.load(player);
            if ( !entry ) return;

            entry.discipline1XP += 20;
            entry.discipline2XP += 5;

            ORMDisciplinesXP.save(player);

            let customPacket01Update = new CustomPacketDisciplineXP(1, (entry.activeDisciplineID === 1 ? 1 : 0), entry.discipline1XP);
            customPacket01Update.write().SendToPlayer(player);

            let customPacket02Update = new CustomPacketDisciplineXP(2, (entry.activeDisciplineID === 2 ? 1 : 0), entry.discipline2XP);
            customPacket02Update.write().SendToPlayer(player);

        });

        events.CustomPacket.OnReceive(CUSTOM_PACKET_DISCIPLINE_XP_OPCODE, (opcode, packet, player) => {
            
            let customPacketRequest = new CustomPacketDisciplineXP(0, 0, 0);
            customPacketRequest.read(packet);

            const disciplineID = customPacketRequest.ID;
            if ( !disciplineID ) return;

            const entry = ORMDisciplinesXP.load(player);
            if ( !entry ) return;
            
            let disciplineXP = -1;
            switch ( disciplineID ) {
                case 1: disciplineXP = entry.discipline1XP; break;
                case 2: disciplineXP = entry.discipline2XP; break;
                case 3: disciplineXP = entry.discipline3XP; break;
                case 4: disciplineXP = entry.discipline4XP; break;
                case 5: disciplineXP = entry.discipline5XP; break;
                case 6: disciplineXP = entry.discipline6XP; break;
            }

            let customPacket = new CustomPacketDisciplineXP(disciplineID, (entry.activeDisciplineID === customPacketRequest.ID ? 1 : 0), disciplineXP);
            customPacket.write().SendToPlayer(player);

        });

    }

}