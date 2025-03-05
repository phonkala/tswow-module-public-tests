export function Main(events: TSEvents) {
    


    events.Spell.OnCast(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.moonstalker-form"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;

        const primalRendSpellInfo = GetSpellInfo(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-1"));
        if ( !primalRendSpellInfo ) return;

        const lastLearnedRank = getLastLearnedRankSpellInfo(primalRendSpellInfo, caster);
        if ( !lastLearnedRank ) return;

        const nextRank = lastLearnedRank.GetNextRankSpell();
        if ( !nextRank ) return;
        
        caster.LearnSpell(nextRank.GetEntry());
        caster.SetPowerType(Powers.ENERGY);

    });

    

    events.Spell.OnAfterCast(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.moonstalker-form"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;

        caster.SetPower(Powers.ENERGY, 100);

    });

    

    events.Spell.OnRemove(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.moonstalker-form"), (effect, application, type) => {

        const caster = ToPlayer(effect.GetCaster());
        if ( !caster ) return;

        const primalRendSpellInfo = GetSpellInfo(UTAG("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-1"));
        if ( !primalRendSpellInfo ) return;

        const lastLearnedRank = getLastLearnedRankSpellInfo(primalRendSpellInfo, caster);
        if ( !lastLearnedRank ) return;

        const nextRank = lastLearnedRank.GetNextRankSpell();
        if ( !nextRank ) return;

        if ( !caster.HasAura(effect.GetID()) ) {

            caster.RemoveSpell(nextRank.GetEntry(), false, true);
            caster.SetPowerType(Powers.MANA);

        }

    });
    


    // Helper functions.



    function getLastLearnedRankSpellInfo (spellInfo: TSSpellInfo, player: TSPlayer) {

        let lastLearnedRank = spellInfo;
        let nextLearnedRank = spellInfo.GetNextRankSpell();

        while ( nextLearnedRank ) {

            nextLearnedRank = nextLearnedRank.GetNextRankSpell();

            if ( nextLearnedRank && player.HasSpell(nextLearnedRank.GetEntry()) ) {
                lastLearnedRank = nextLearnedRank;
            }

        }

        return lastLearnedRank;

    }

}