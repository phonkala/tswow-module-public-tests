import { std } from "wow/wotlk";

import { SPELL_IDS } from "./spells";



SPELL_IDS["prowl"].forEach((spellID) => {

    std.Spells
        .load(spellID)
        .Description.enGB.set("Allows the Druid to prowl around. Lasts until cancelled.")
        .AuraDescription.enGB.set("Stealthed.")
        .Effects.clear(1)
    ;

});