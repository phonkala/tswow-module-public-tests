export function Main(events: TSEvents) {



    // Convert runes to death runes.

    events.Spell.OnCast(UTAG("tswow-module-public-tests.spells", "spell.metamorphosis"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;

        for ( let i = 0; i < 6; i++ ) {
            caster.SetRuneCooldown(i, 0, false);
            caster.ConvertRune(i, 3);
        }

        caster.ResyncRunes();

    });



    // Remove Metamorphosis aura OnLogin to avoid issues with runes. Can probably be fixed better way later with more core edits.

    events.Player.OnLogin((player, firstLogin) => {

        player.RemoveAura(UTAG("tswow-module-public-tests.spells", "spell.metamorphosis"));

    });



    // Remove the complementary auras when Metamorphosis is removed.

    events.Spell.OnRemove(UTAG("tswow-module-public-tests.spells", "spell.metamorphosis"), (effect, application, type) => {

        const player = ToPlayer(effect.GetCaster());
        if ( !player ) return;

        player.RemoveAura(UTAG("tswow-module-public-tests.spells", "spell.metamorphosis.modify-movement-speed-and-armor"));
        player.RemoveAura(UTAG("tswow-module-public-tests.spells", "spell.metamorphosis.modify-runes-and-autoattack"));
        player.RemoveAura(UTAG("tswow-module-public-tests.spells", "spell.metamorphosis.modify-haste"));

    });

}