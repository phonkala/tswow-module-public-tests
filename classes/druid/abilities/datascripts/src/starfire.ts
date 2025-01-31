import { std } from "wow/wotlk";

import { SPELL_IDS } from "./spells";



SPELL_IDS["starfire"].forEach((spellID) => {

    std.Spells
        .load(spellID)
        .Effects.mod(0, x=>x
            .ImplicitTargetB.UNIT_DEST_AREA_ENEMY.set()
            .Radius.setSimple(10, 0, 10)
        )
        .Visual.modRefCopy(x=>x
            .CastKit.modRefCopy(x=>x
                .CameraShake.set(3)
            )
        )
    ;

});