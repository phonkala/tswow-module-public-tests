import { CONFIG } from "../datascripts/config";



export function Main(events: TSEvents) {
    
    
    
    // Buffs.
    
    const auraIDs = [
        UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reduce-spell-damage-taken"),
        UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-spell-damage"),
        UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reduce-physical-damage-taken"),
        UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-physical-damage"),
        UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reflect-damage"),
        UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-resistances"),
        UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-armor"),
        UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-health")
    ];



    events.Creature.OnJustAppeared(TAG("tswow-module-public-tests.worldbosses.maldrion", "creature.auto-set-position-z"), (creature) => {

        // Force creatures always appear at ground level.

        const map = creature.GetMap();

        const x = creature.GetX();
        const y = creature.GetY();
        const z = map.GetHeight(x, y, 0);
        const o = creature.GetO();

        creature.NearTeleport(x, y, z, o);
        
    });



    events.Creature.OnJustAppeared(TAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add"), (creature) => {

        // Apply random aura to adds.

        let randomAuraID = auraIDs[Math.floor(Math.random() * auraIDs.length)];

        creature.AddAura(randomAuraID, creature);
        
    });



    events.Creature.OnDeathEarly(TAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add"), (dying, killer) => {

        // Transfer buffs from adds to ghosts.
        
        if ( !killer ) return;

        const auras = dying.GetAuraApplications();

        const ghost = dying.GetNearestCreature(5, UTAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.ghost"));
        if ( !ghost ) return;

        auras.forEach((aura) => {
            
            const auraID = aura.GetAura().GetAuraID();

            if ( auraIDs.includes(auraID) ) {

                ghost.AddAura(aura.GetAura().GetAuraID(), ghost);
                
            }

        });

        // Make ghost attack the killer of the add (to stay in combat / not regen health).

        ghost.Attack(killer, false);
        
        // Summon ghost killer creature and save the add GUID as "parent-guid" so we know which ghost to target later.

        dying.SetGUIDNumber("parent-guid", ghost.GetGUID());

        const ghost_killer = ghost.GetMap().SpawnCreature(UTAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.ghost-killer"), ghost.GetPosition().x, ghost.GetPosition().y, ghost.GetPosition().z, ghost.GetPosition().o, 0, 1);
        if ( !ghost_killer ) return;

        ghost_killer.SetGUIDNumber("parent-guid", ghost.GetGUID());
        
    });



    events.Creature.OnGossipHello(UTAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.ghost-killer"), (creature, player, cancel) => {

        // Trigger a spell when ghost killer creature is interacted with.

        const parentGUID = creature.GetGUIDNumber("parent-guid");
        if ( !parentGUID ) return;

        player.CastSpell(creature, UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion-add.ghost-killer.activate-ghost-killer"));

        cancel.set(true);

    });



    events.Spell.OnAfterCast(UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion-add.ghost-killer.activate-ghost-killer"), (spell, cancel) => {

        // Cast channeled spell to kill the specific ghost (selected based on "parent-guid").

        const target = ToCreature(spell.GetTarget());
        if ( !target ) return;
    
        const parentGUID = target.GetGUIDNumber("parent-guid");
        if ( !parentGUID ) return;

        const ghost = target.GetCreature(parentGUID);
        if ( !ghost ) return;

        target.CastSpell(ghost, UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion-add.ghost-killer.drain-ghost"));

        target.DespawnOrUnsummon(6000);

    });



    events.Creature.OnUpdateAI(UTAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.ghost"), (creature, diff) => {

        // Scale ghosts down based on their health percentage.

        creature.SetScale(creature.GetHealthPct() / 100 + 0.1);

    });



    events.Creature.OnMovementInform(TAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add-or-ghost"), (creature, type, id) => {

        // If adds or ghosts reach the boss, transfer their buffs to the boss.

        switch ( id ) {

            case 20:
            case 30:

                const boss = creature.GetNearestCreature(5, UTAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion"));
                if ( !boss ) return;

                const auras = creature.GetAuraApplications();
                
                auras.forEach((aura) => {
                    
                    const auraID = aura.GetAura().GetAuraID();

                    if ( auraIDs.includes(auraID) ) {

                        boss.AddAura(aura.GetAura().GetAuraID(), boss);
                        
                    }

                });
                
                break;

        }

    });



    events.Creature.OnMovementInform(TAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add"), (creature, type, id) => {

        // If adds reach the boss, make boss do some AoE damage.
        
        switch ( id ) {

            case 20:

                const boss = creature.GetNearestCreature(5, UTAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion"));
                if ( !boss ) return;
                
                boss.CastSpell(boss, UTAG("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.blood-boil"), true);
                
                break;

        }

    });



    events.Creature.OnJustAppeared(TAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.projectile"), (creature) => {

        // Shoot projectiles to random directions (positions in certain range) from the add.
        
        const angle = Math.random() * 2 * Math.PI;

        const projectileDestinationX = creature.GetPosition().x + CONFIG.projectileDestinationDistance * Math.cos(angle);
        const projectileDestinationY = creature.GetPosition().y + CONFIG.projectileDestinationDistance * Math.sin(angle);
        const projectileDestinationZ = creature.GetMap().GetHeight(projectileDestinationX, projectileDestinationY, 0);

        creature.MoveTo(creature.GetGUIDLow(), projectileDestinationX, projectileDestinationY, projectileDestinationZ, true);
        
    });

}