import { std } from "wow/wotlk";

import { CONFIG } from "../config";

import { CREATURES } from "./creatures";
import { SPELLS } from "./spells";



// Creature scripts.

CREATURES.maldrion

    /**
    * Phase 1, 3, 5, 7: Boss main phases (caster > physical dps > ranged dps > tank).
    * Phases 2, 4, 6: Add phases, boss immune.
    * Phase 8: Enrage.
    * 
    * Creature counters:
    * ID  1: Boss phase.
    * ID  2: Add phase 1: count adds/ghosts that have reached the boss or ghosts that have died.
    * ID  3: Add phase 2: count adds/ghosts that have reached the boss or ghosts that have died.
    * ID  4: Add phase 3: count adds/ghosts that have reached the boss or ghosts that have died.
    * ID 10: Dummy counter to add some delay for rp stuff.
    */


    
    // Phase 1: Caster form.

    .Scripts.onAggro(x=>x
        .Action.setSetCounter(1, 1, 1).Target.setSelf()
    )
    .Scripts.onCounterSet(1, 1, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 11, false)
                .addAction(    0, x=>x.Action.setTalk({ enGB: "Phase 1 (caster)" }, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(1).Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStop().Target.setSelf())
                .addAction(    0, x=>x.Action.setSetReactState("PASSIVE").Target.setSelf())
                .addAction( 1000, x=>x.Action.setSetReactState("AGGRESSIVE").Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStart().Target.setSelf())
            .ID
        , 1, 1).Target.setSelf()
    )
    .Scripts.onUpdateIc(1000, 1000, 1500, 1500, x=>x
        .Action.setCast(SPELLS.wrath.ID, 4, 5).Target.setVictim()
        .row.event_phase_mask.set(1)
    )
    .Scripts.onUpdateIc(3000, 8000, 3000, 8000, x=>x
        .Action.setCast(SPELLS.starfire.ID, 4, 5).Target.setVictim()
        .row.event_phase_mask.set(1)
    )
    .Scripts.onUpdateIc(6000, 16000, 10000, 15000, x=>x
        .Action.setCast(SPELLS.rejuvenation.ID, 4, 5).Target.setSelf()
        .row.event_phase_mask.set(1)
    )
    .Scripts.onUpdateIc(6000, 16000, 15000, 20000, x=>x
        .Action.setCast(SPELLS.regrowth.ID, 4, 5).Target.setSelf()
        .row.event_phase_mask.set(1)
    )



    // Phase 2: First adds phase.

    .Scripts.onHealthPct(0, 70, 0, 0, (script) => {
        script.Action.setSetCounter(1, 2, 1).Target.setSelf();
        script.row.event_flags.set(1);
    })
    .Scripts.onCounterSet(1, 2, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 21, false)
                .addAction(    0, x=>x.Action.setTalk({ enGB: "Yes, do your worst! It's never gonna be enough!" }, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(2).Target.setSelf())
                .addAction(    0, x=>x.Action.setInterruptSpell(0, 0, 1).Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStop().Target.setSelf() )
                .addAction(    0, x=>x.Action.setSetReactState("PASSIVE").Target.setSelf())
                .addAction( 1000, x=>x.Action.setCast(SPELLS.immunity.ID, 6, 5).Target.setSelf())
                .addAction(    0, x=>x.Action.setMoveToPos(10, 0, 0, 0).Target.setPosition(CONFIG.bossSpawnPosition))
            .ID
        , 1, 1).Target.setSelf()
    )
    .Scripts.onMovementinform(0, 10, (script) => {
        
        const timedActionList = std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 22, false)
            .addAction(    0, x=>x.Action.setTalk({ enGB: "Do you really think I go down that easy? You have no idea what is waiting for you!" }, 1000).Target.setSelf())
            .addAction(    0, x=>x.Action.setSetOrientation(0).Target.setSelf())
            .addAction(    0, x=>x.Action.setSetEmoteState(468).Target.setSelf())
            .addAction(    0, x=>x.Action.setTalk({ enGB: "Arise my minions, ARISE!" }, 1000).Target.setSelf())
            .addAction( 3000, x=>x.Action.setSetCounter(10, 0, 0).Target.setSelf())
        ;

        const addsSpawnPositions = getAddsSpawnPositions(CONFIG.bossSpawnPosition, CONFIG.addsPerPhase[0], CONFIG.addsDistanceFromBoss);

        for ( const addsSpawnPosition of addsSpawnPositions ) {
            
            timedActionList.addAction(0, x=>x.Action.setSummonCreature(CREATURES.maldrionAddType1.ID, "TIME_OR_DEATH", 100000, 0).Target.setPosition(addsSpawnPosition))
            timedActionList.addAction(0, x=>x.Action.setSummonCreature(CREATURES.maldrionAddGhost.ID, "TIME_OR_DEATH", 100000, 0).Target.setPosition(addsSpawnPosition))

        };

        script.Action.setCallTimedActionlist(timedActionList.ID, 1, 1).Target.setSelf();

    })
    


    // Phase 3: Physical dps boss phase.

    .Scripts.onCounterSet(2, CONFIG.addsPerPhase[0], 0, 0, x=>x
        .Action.setSetCounter(4, 0, 1).Target.setSelf()
        .then()
        .Action.setSetCounter(3, 0, 1).Target.setSelf()
        .then()
        .Action.setSetCounter(1, 3, 1).Target.setSelf()
    )
    .Scripts.onCounterSet(1, 3, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 31, false)
                .addAction(    0, x=>x.Action.setTalk({ enGB: "Time to make you BLEED!" }, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(3).Target.setSelf())
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddType1.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddType2.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddGhost.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddGhostKiller.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setRemoveaurasfromspell(SPELLS.immunity.ID, 0).Target.setSelf())
                .addAction(    0, x=>x.Action.setCast(SPELLS.cat_form.ID, 6, 5).Target.setSelf())
                .addAction( 1000, x=>x.Action.setSetReactState("AGGRESSIVE").Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStart().Target.setSelf())
                .addAction( 1000, x=>x.Action.setCast(SPELLS.feral_charge_cat.ID, 6, 5).Target.setVictim())
            .ID
        , 1, 1).Target.setSelf()
    )
    .Scripts.onUpdateIc(2500, 2500, 55000, 60000, x=>x
        .Action.setCast(SPELLS.mangle_cat.ID, 0, 5).Target.setVictim()
        .row.event_phase_mask.set(4)
    )
    .Scripts.onUpdateIc(3500, 3500, 7000, 9000, x=>x
        .Action.setCast(SPELLS.rake.ID, 0, 5).Target.setVictim()
        .row.event_phase_mask.set(4)
    )
    .Scripts.onUpdateIc(4500, 4500, 1500, 2500, x=>x
        .Action.setCast(SPELLS.claw.ID, 0, 5).Target.setVictim()
        .row.event_phase_mask.set(4)
    )
    .Scripts.onUpdateIc(6000, 9000, 10000, 14000, x=>x
        .Action.setCast(SPELLS.rip.ID, 0, 5).Target.setVictim()
        .row.event_phase_mask.set(4)
    )
    .Scripts.onUpdateIc(12000, 15000, 12000, 18000, x=>x
        .Action.setCast(SPELLS.ferocious_bite.ID, 0, 5).Target.setVictim()
        .row.event_phase_mask.set(4)
    )
    .Scripts.onUpdateIc(17500, 17500, 15000, 15000, x=>x
        .Action.setCast(SPELLS.feral_charge_cat.ID, 6, 5).Target.setHostileRandom()
        .row.event_phase_mask.set(4)
    )



    // Phase 4: Second adds phase.

    .Scripts.onHealthPct(0, 50, 0, 0, (script) => {
        script
            .Action.setSetCounter(4, 0, 1).Target.setSelf()
            .then()
            .Action.setSetCounter(3, 0, 1).Target.setSelf()
            .then()
            .Action.setSetCounter(1, 4, 1).Target.setSelf()
        ;
        script.row.event_flags.set(1);
    })
    .Scripts.onCounterSet(1, 4, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 41, false)
                .addAction(    0, x=>x.Action.setTalk({ enGB: "Phase 4 (transition)" }, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(4).Target.setSelf())
                .addAction(    0, x=>x.Action.setInterruptSpell(0, 0, 1).Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStop().Target.setSelf())
                .addAction(    0, x=>x.Action.setSetReactState("PASSIVE").Target.setSelf())
                .addAction( 1000, x=>x.Action.setCast(SPELLS.immunity.ID, 6, 5).Target.setSelf())
                .addAction(    0, x=>x.Action.setMoveToPos(11, 0, 0, 0).Target.setPosition(CONFIG.bossSpawnPosition))
            .ID
        , 1, 1).Target.setSelf()
    )
    .Scripts.onMovementinform(0, 11, (script) => {
        
        const timedActionList = std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 42, false)
            .addAction(    0, (script) => { script.Action.setTalk({ enGB: "Do you really think I go down that easy? You have no idea what is waiting for you!" }, 1000).Target.setSelf(); })
            .addAction(    0, (script) => { script.Action.setSetOrientation(0).Target.setSelf(); })
            .addAction(    0, (script) => { script.Action.setSetEmoteState(468).Target.setSelf(); })
            .addAction(    0, (script) => { script.Action.setRemoveaurasfromspell(SPELLS.cat_form.ID, 0).Target.setSelf(); })
            .addAction(    0, (script) => { script.Action.setTalk({ enGB: "Arise my minions, ARISE!" }, 1000).Target.setSelf(); })
            .addAction( 3000, (script) => { script.Action.setSetCounter(10, 0, 0).Target.setSelf(); })
        ;

        const addsSpawnPositions = getAddsSpawnPositions(CONFIG.bossSpawnPosition, CONFIG.addsPerPhase[1], CONFIG.addsDistanceFromBoss);

        for ( const addsSpawnPosition of addsSpawnPositions ) {

            timedActionList.addAction(0, x=>x.Action.setSummonCreature(CREATURES.maldrionAddType2.ID, "TIME_OR_DEATH", 100000, 0).Target.setPosition(addsSpawnPosition))
            timedActionList.addAction(0, x=>x.Action.setSummonCreature(CREATURES.maldrionAddGhost.ID, "TIME_OR_DEATH", 100000, 0).Target.setPosition(addsSpawnPosition))

        }

        script.Action.setCallTimedActionlist(timedActionList.ID, 1, 1).Target.setSelf();

    })



    // Phase 5: Caster dps boss phase.

    .Scripts.onCounterSet(3, CONFIG.addsPerPhase[1], 0, 0, x=>x
        .Action.setSetCounter(4, 0, 1).Target.setSelf()
        .then()
        .Action.setSetCounter(1, 5, 1).Target.setSelf()
    )
    .Scripts.onCounterSet(1, 5, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 51, false)
                .addAction(    0, x=>x.Action.setTalk({ enGB: "Phase 5 (moonkin form)" }, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(5).Target.setSelf())
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddType1.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddType2.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddGhost.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddGhostKiller.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setRemoveaurasfromspell(SPELLS.immunity.ID, 0).Target.setSelf())
                .addAction(    0, x=>x.Action.setCast(SPELLS.moonkin_form.ID, 6, 5).Target.setSelf())
                .addAction( 1000, x=>x.Action.setSetReactState("AGGRESSIVE").Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStart().Target.setSelf())
            .ID
        , 1, 1).Target.setSelf()
    )
    .Scripts.onUpdateIc(1000, 1000, 1500, 1500, x=>x
        .Action.setCast(SPELLS.wrath.ID, 4, 5).Target.setVictim()
        .row.event_phase_mask.set(16)
    )
    .Scripts.onUpdateIc(3000, 8000, 3000, 8000, x=>x
        .Action.setCast(SPELLS.starfire.ID, 4, 5).Target.setVictim()
        .row.event_phase_mask.set(16)
    )
    .Scripts.onUpdateIc(7000, 11000, 20000, 20000, x=>x
        .Action.setCast(SPELLS.typhoon.ID, 6, 5).Target.setVictim()
        .row.event_phase_mask.set(16)
    )
    .Scripts.onUpdateIc(13000, 16000, 45000, 60000, x=>x
        .Action.setCast(SPELLS.starfall.ID, 6, 5).Target.setVictim()
        .row.event_phase_mask.set(16)
    )



    // Phase 6: Third adds phase.

    .Scripts.onHealthPct(0, 30, 0, 0, (script) => {
        script
            .Action.setSetCounter(1, 6, 1).Target.setSelf()
            .then()
            .Action.setSetCounter(4, 0, 1).Target.setSelf()
        ;
        script.row.event_flags.set(1);
    })
    .Scripts.onCounterSet(1, 6, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 61, false)
                .addAction(    0, x=>x.Action.setTalk({ enGB: "Phase 6 (transition)" }, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(6).Target.setSelf())
                .addAction(    0, x=>x.Action.setInterruptSpell(0, 0, 1).Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStop().Target.setSelf())
                .addAction(    0, x=>x.Action.setSetReactState("PASSIVE").Target.setSelf())
                .addAction( 1000, x=>x.Action.setCast(SPELLS.immunity.ID, 6, 5).Target.setSelf())
                .addAction(    0, x=>x.Action.setMoveToPos(12, 0, 0, 0).Target.setPosition(CONFIG.bossSpawnPosition))
            .ID
        , 1, 1).Target.setSelf()
    )
    .Scripts.onMovementinform(0, 12, (script) => {

        const timedActionList = std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 62, false)
            .addAction(    0, x=>x.Action.setTalk({ enGB: "Do you really think I go down that easy? You have no idea what is waiting for you!" }, 1000).Target.setSelf())
            .addAction(    0, x=>x.Action.setSetOrientation(0).Target.setSelf())
            .addAction(    0, x=>x.Action.setSetEmoteState(468).Target.setSelf())
            .addAction(    0, x=>x.Action.setRemoveaurasfromspell(SPELLS.moonkin_form.ID, 0).Target.setSelf())
            .addAction(    0, x=>x.Action.setTalk({ enGB: "Arise my minions, ARISE!" }, 1000).Target.setSelf())
            .addAction( 3000, x=>x.Action.setSetCounter(10, 0, 0).Target.setSelf())
        ;

        const addsSpawnPositions = getAddsSpawnPositions(CONFIG.bossSpawnPosition, CONFIG.addsPerPhase[2], CONFIG.addsDistanceFromBoss);

        for ( const addsSpawnPosition of addsSpawnPositions ) {
            
            let randomAddTypeID = Math.random() < 0.5 ? CREATURES.maldrionAddType1.ID : CREATURES.maldrionAddType2.ID;

            timedActionList.addAction(0, x=>x.Action.setSummonCreature(randomAddTypeID, "TIME_OR_DEATH", 100000, 0).Target.setPosition(addsSpawnPosition))
            timedActionList.addAction(0, x=>x.Action.setSummonCreature(CREATURES.maldrionAddGhost.ID, "TIME_OR_DEATH", 100000, 0).Target.setPosition(addsSpawnPosition))

        }

        script.Action.setCallTimedActionlist(timedActionList.ID, 1, 1).Target.setSelf();

    })
    


    // Phase 7: Tank boss phase.
    
    .Scripts.onCounterSet(4, CONFIG.addsPerPhase[2], 0, 0, x=>x
        .Action.setSetCounter(1, 7, 1).Target.setSelf()
    )
    .Scripts.onCounterSet(1, 7, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 71, false)
                .addAction(    0, x=>x.Action.setTalk({ enGB: "Phase 7 (bear form)" }, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(7).Target.setSelf())
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddType1.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddType2.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddGhost.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setForceDespawn(500, 0).Target.setCreatureDistance(CREATURES.maldrionAddGhostKiller.ID, CONFIG.addsDistanceFromBoss + 10, 0))
                .addAction(    0, x=>x.Action.setRemoveaurasfromspell(SPELLS.immunity.ID, 0).Target.setSelf())
                .addAction(    0, x=>x.Action.setCast(SPELLS.bear_form.ID, 6, 5).Target.setSelf())
                .addAction( 1000, x=>x.Action.setSetReactState("AGGRESSIVE").Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStart().Target.setSelf())
                .addAction( 1000, x=>x.Action.setCast(SPELLS.feral_charge_bear.ID, 6, 5).Target.setVictim())
            .ID
        , 1, 1).Target.setSelf()
    )
    .Scripts.onUpdateIc(2500, 2500, 55000, 60000, x=>x
        .Action.setCast(SPELLS.mangle_bear.ID, 6, 5).Target.setVictim()
        .row.event_phase_mask.set(192)
    )
    .Scripts.onUpdateIc(4000, 4000, 5000, 14000, x=>x
        .Action.setCast(SPELLS.lacerate.ID, 6, 5).Target.setVictim()
        .row.event_phase_mask.set(192)
    )
    .Scripts.onUpdateIc(5500, 5500, 1500, 1500, x=>x
        .Action.setCast(SPELLS.swipe_bear.ID, 6, 5).Target.setVictim()
        .row.event_phase_mask.set(192)
    )
    .Scripts.onUpdateIc(12500, 12500, 10000, 10000, x=>x
        .Action.setCast(SPELLS.feral_charge_bear.ID, 6, 5).Target.setHostileRandom()
        .row.event_phase_mask.set(192)
    )



    // Phase 8: Boss enrage.

    .Scripts.onHealthPct(0, 10, 0, 0, (script) => {
        script.Action.setSetCounter(1, 8, 1).Target.setSelf();
        script.row.event_flags.set(1);
    })
    .Scripts.onCounterSet(1, 8, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.maldrion.ID, 81, false)
                .addAction(    0, x=>x.Action.setTalk({ enGB: "Now you made me angry!" }, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(8).Target.setSelf())
                .addAction( 1000, x=>x.Action.setCast(SPELLS.frenzy.ID, 6, 5).Target.setSelf())
                .addAction(    0, x=>x.Action.setCast(SPELLS.barkskin.ID, 6, 5).Target.setVictim())
                .addAction(    0, x=>x.Action.setCast(SPELLS.enrage.ID, 6, 5).Target.setVictim())
                .addAction( 1500, x=>x.Action.setCast(SPELLS.frenzied_regeneration.ID, 6, 5).Target.setVictim())
            .ID
        , 1, 1).Target.setSelf()
    )
    


    // Boss reset.

    .Scripts.onReachedHome(x=>x
        // Despawn adds, reset counters etc.
        .Action.setSetEmoteState(0).Target.setSelf()
        .then()
        .Action.setForceDespawn(0, 0).Target.setCreatureDistance(CREATURES.maldrionAddType1.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setForceDespawn(0, 0).Target.setCreatureDistance(CREATURES.maldrionAddType2.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setForceDespawn(0, 0).Target.setCreatureDistance(CREATURES.maldrionAddGhost.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setForceDespawn(0, 0).Target.setCreatureDistance(CREATURES.maldrionAddProjectile.ID, CONFIG.projectileDestinationDistance + 20, 0)
        .then()
        .Action.setForceDespawn(0, 0).Target.setCreatureDistance(CREATURES.maldrionAddGhostKiller.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(1, 0, 1).Target.setSelf()
        .then()
        .Action.setSetCounter(2, 0, 1).Target.setSelf()
        .then()
        .Action.setSetCounter(3, 0, 1).Target.setSelf()
        .then()
        .Action.setSetCounter(4, 0, 1).Target.setSelf()
    )

;



CREATURES.maldrionAddType1
    .Scripts.onJustSummoned(x=>x
        .Action.setAttackStop().Target.setSelf()
        .then()
        .Action.setSetReactState("PASSIVE").Target.setSelf()
        .then()
        .Action.setMoveToPos(20, 0, 0, 0).Target.setPosition(CONFIG.bossSpawnPosition)
    )
    .Scripts.onMovementinform(0, 20, x=>x
        .Action.setForceDespawn(500, 0).Target.setSelf()
        .then()
        .Action.setSetCounter(2, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(3, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(4, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
    )
    .Scripts.onDeath(x=>x
        .Action.setSetVisibility(1).Target.setClosestCreature(CREATURES.maldrionAddGhost.ID, 5, 0)
    )
    // Shoot projectiles.
    .Scripts.onUpdate(1000, 1000, 3000, 3000, x=>x
        .Action.setSummonCreature(CREATURES.maldrionAddProjectile.ID, "TIME", 5000, 0).Target.setSelf()
        .then()
        .Action.setSummonCreature(CREATURES.maldrionAddProjectile.ID, "TIME", 5000, 0).Target.setSelf()
        .then()
        .Action.setSummonCreature(CREATURES.maldrionAddProjectile.ID, "TIME", 5000, 0).Target.setSelf()
    )
;



CREATURES.maldrionAddType2
    .Scripts.onJustSummoned(x=>x
        .Action.setAttackStop().Target.setSelf()
        .then()
        .Action.setSetReactState("PASSIVE").Target.setSelf()
        .then()
        .Action.setMoveToPos(20, 0, 0, 0).Target.setPosition(CONFIG.bossSpawnPosition)
        .then()
        .Action.setCast(SPELLS.unholy_aura.ID, 6, 5).Target.setSelf()
    )
    .Scripts.onMovementinform(0, 20, x=>x
        .Action.setForceDespawn(500, 0).Target.setSelf()
        .then()
        .Action.setSetCounter(2, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(3, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(4, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
    )
    .Scripts.onDeath(x=>x
        .Action.setSetVisibility(1).Target.setClosestCreature(CREATURES.maldrionAddGhost.ID, 5, 0)
    )
;



CREATURES.maldrionAddGhost
    .Scripts.onJustSummoned(x=>x
        .Action.setAttackStop().Target.setSelf()
        .then()
        .Action.setSetReactState("PASSIVE").Target.setSelf()
        .then()
        .Action.setSetVisibility(0).Target.setSelf()
        .then()
        .Action.setMoveToPos(30, 0, 0, 0).Target.setPosition(CONFIG.bossSpawnPosition)
    )
    .Scripts.onMovementinform(0, 30, x=>x
        .Action.setForceDespawn(500, 0).Target.setSelf()
        .then()
        .Action.setSetCounter(2, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(3, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(4, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
    )
    .Scripts.onDeath(x=>x
        .Action.setSetCounter(2, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(3, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
        .then()
        .Action.setSetCounter(4, 1, 0).Target.setCreatureDistance(CREATURES.maldrion.ID, CONFIG.addsDistanceFromBoss + 10, 0)
    )
;



CREATURES.maldrionAddProjectile
    // Movement is handled in livescripts.
    .Scripts.onJustSummoned(x=>x
        .Action.setAttackStop().Target.setSelf()
        .then()
        .Action.setSetReactState("PASSIVE").Target.setSelf()
        .then()
        .Action.setCast(SPELLS.power_ball_visual.ID, 6, 5).Target.setSelf()
        .then()
        .Action.setCast(SPELLS.power_ball_damage_trigger.ID, 6, 5).Target.setSelf()
        .then()
        .Action.setCast(65745, 6, 5).Target.setSelf() // TODO: Path of Cenarius.
    )
;



// Helper functions.



// Calculate adds spawn positions based on boss position.

function getAddsSpawnPositions (bossSpawnPosition: TSPosition, numberOfAdds: number, addsDistanceFromBoss: number): TSPosition[] {
    
    const addsSpawnPositions: TSPosition[] = [];

    const addsSpawnPositionsOffset = Math.random() * 2 * Math.PI;

    for ( let i = 0; i < numberOfAdds; i++ ) {

        const angle = (i / numberOfAdds) * 2 * Math.PI + addsSpawnPositionsOffset;

        addsSpawnPositions.push({
            map: bossSpawnPosition.map,
            x: bossSpawnPosition.x + addsDistanceFromBoss * Math.cos(angle),
            y: bossSpawnPosition.y + addsDistanceFromBoss * Math.sin(angle),
            z: bossSpawnPosition.z,
            o: bossSpawnPosition.o
        });

    }

    return addsSpawnPositions;

}