import { std } from "wow/wotlk";

import { SPELL_IDS, DISABLED_SPELL_IDS } from "./src/spells";



// Add tags to all spells for livescripts.

for ( let spellName in SPELL_IDS ) {
    
    SPELL_IDS[spellName].forEach((spellID, index) => {
    
        const spell   = std.Spells.load(spellID);
        const rank    = index + 1;
        
        if ( !spell ) return;
        
        spell.Tags.add("tswow-module-public-tests.classes.druid.abilities", "spell." + spellName);
        spell.Tags.add("tswow-module-public-tests.classes.druid.abilities", "spell." + spellName + ".rank-" + rank);

        for ( let i = rank; i > 1; i-- ) {
            spell.Tags.add("tswow-module-public-tests.classes.druid.abilities", "spell." + spellName + ".rank-" + i + "+");
        }

    });

}



// Disable spells. TODO: AcquireMethod = "LEARN_WITH_SKILL" works, but seems iffy... Should be able to set "NONE".

for ( const spellName in DISABLED_SPELL_IDS ) {
    
    DISABLED_SPELL_IDS[spellName].forEach((spellID) => {
        
        std.Spells.load(spellID).SkillLines.forEach((value, index) => {
            value.AcquireMethod.set("LEARN_WITH_SKILL");
        });

    });

}