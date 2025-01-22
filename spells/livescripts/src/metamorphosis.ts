export function Main(events: TSEvents) {

    events.Spell.OnCast(UTAG("tswow-module-public-tests.spells", "spell.metamorphosis"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;

        for ( let i = 0; i < 6; i++ ) {
            caster.SetRuneCooldown(i, 0, false);
            caster.ConvertRune(i, 3);
        }

        caster.ResyncRunes();

    });

}