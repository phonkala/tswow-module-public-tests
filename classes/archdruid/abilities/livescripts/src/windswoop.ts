export function Main(events: TSEvents) {

    

    events.Spell.OnCast(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;

        caster.CastSpell(caster, UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop.knockback-aura"), true);

        const targetDest = spell.GetTargetDest();
        
        const creature = caster.GetMap().SpawnCreature(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "creature.windswoop-aura-remover"), targetDest.x, targetDest.y, targetDest.z, targetDest.o, 3000);
        if ( !creature ) return;

        creature.SetInt("playerGUIDLow", caster.GetGUIDLow());

    });



    events.Creature.OnUpdateAI(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "creature.windswoop-aura-remover"), (creature, diff) => {

        const players = creature.GetPlayersInRange(2, 0, 0);
        if ( !players ) return;

        players.forEach((player) => {

            if ( player.HasAura(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop.knockback-aura"))
                && creature.GetInt("playerGUIDLow") === player.GetGUIDLow() ) {
                
                player.RemoveAura(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop.knockback-aura"));

                creature.DespawnOrUnsummon(0);

            }

        });

    });

}