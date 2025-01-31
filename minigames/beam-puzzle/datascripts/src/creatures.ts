import { std } from "wow/wotlk";

import { CONFIG } from "../config";



const beamReflector = std.CreatureTemplates
    .create("tswow-module-public-tests.minigames.beam-puzzle", "creature.beam-reflector", 32666)
    .Name.enGB.set("Beam Puzzle: Beam Reflector")
    .FactionTemplate.NEUTRAL_PASSIVE.set()
    .Level.set(80, 80)
    .NormalLoot.set(0)
    .Gold.set(0)
    .NPCFlags.GOSSIP.set(true)
    .Icon.setInteract()
    .UnitFlags.DISABLE_TURN.set(true)
    .Tags.addUnique("tswow-module-public-tests.minigames.beam-puzzle", "creature.beam-reflector")
;

if ( CONFIG.isActive ) {
    beamReflector.Spawns.add("tswow-module-public-tests.minigames.beam-puzzle", "creature.beam-reflector.spawn-1", CONFIG.position)
}



// Export.

export const CREATURES = {
    beamReflector
};