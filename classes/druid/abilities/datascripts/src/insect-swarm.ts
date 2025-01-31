import { std } from "wow/wotlk";

import { SPELL_IDS } from "./spells";



SPELL_IDS["insect-swarm"].forEach((spellID) => {

    std.Spells
        .load(spellID)
        .Effects.mod(0, x=>x
            .ImplicitTargetB.UNIT_DEST_AREA_ENEMY.set()
            .Radius.setSimple(10, 0, 10)
        )
    ;

});