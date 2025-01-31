import { std } from "wow/wotlk";

import { SPELL_IDS } from "./spells";



SPELL_IDS["shred"].forEach((spellID) => {

    std.Spells
        .load(spellID)
        .CustomAttributes.REQUIRE_CASTER_BEHIND_TARGET.set(0)
        .Power.CostBase.set(45)
        .Effects.mod(2, x=>x
            .Type.WEAPON_PERCENT_DAMAGE.set()
            .Percentage.set(120)
            .DamagePctBase.set(120)
        )
    ;

});