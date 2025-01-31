import { SPELL_IDS } from "../../datascripts/src/spells";



export function Main(events: TSEvents) {

    // Modify ranks 2 and above.

    events.Spell.OnDamageLate(TAG("tswow-module-public-tests.classes.druid.abilities", "spell.shred.rank-2+"), (spell, damage, info, type, isCrit) => {

        let caster = info.GetAttacker();
        if ( !caster ) return;

        let target = info.GetTarget();
        if ( !target ) return;

        // Do 40% more damage when used from behind the target.
        if ( caster.IsBehind(target) ) {
            damage.set(damage.get() * 1.4);
        }

    });



    // Modify ranks 3 and above.

    let hasStealth = false;

    events.Spell.OnCheckCast(TAG("tswow-module-public-tests.classes.druid.abilities", "spell.shred.rank-3+"), (spell, result) => {

        let caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;

        hasStealth = caster.HasAuraType(AuraType.MOD_STEALTH);
    
    });



    events.Spell.OnDamageLate(TAG("tswow-module-public-tests.classes.druid.abilities", "spell.shred.rank-3+"), (spell, damage, info, type, isCrit) => {

        let caster = info.GetAttacker();
        if ( !caster ) return;

        let target = info.GetTarget();
        if ( !target ) return;

        // Do 60% more damage when used from stealth.
        if ( hasStealth ) {
            damage.set(damage.get() * 1.6);
        }

    });


    
    // Modify ranks 4 and above.

    events.Spell.OnDamageLate(TAG("tswow-module-public-tests.classes.druid.abilities", "spell.shred.rank-4+"), (spell, damage, info, type, isCrit) => {

        let caster = info.GetAttacker();
        if ( !caster ) return;

        let target = info.GetTarget();
        if ( !target ) return;

        // Apply Mangle debuff on the target.
        target.AddAura(SPELL_IDS["mangle-cat"][SPELL_IDS["mangle-cat"].length - 1], target);

    });

}