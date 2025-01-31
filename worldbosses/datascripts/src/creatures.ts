import { std } from "wow/wotlk";

import { CONFIG } from "../config";



const worldbossSummoner = std.CreatureTemplates
    .create("tswow-module-public-tests.worldbosses", "creature.world-boss-summoner", 32666)
    .Name.enGB.set("World Boss Summoner")
    .NPCFlags.GOSSIP.set(true)
    .Tags.addUnique("tswow-module-public-tests.worldbosses", "creature.world-boss-summoner")
;

if ( CONFIG.isActive ) {
    worldbossSummoner.Spawns.add("tswow-module-public-tests.worldbosses", "creature.world-boss-summoner.spawn-1", { map: 1, x: 5412.223633, y: -2754.594727, z: 1458.393555, o: 1.8 });
}



// Export.

export const CREATURES = {

    worldbossSummoner
    
};