import { std } from "wow/wotlk";

import { CONFIG } from "../config";



// Boss.

const maldrion = std.CreatureTemplates
    .create("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion")
    .Name.enGB.set("Maldrion")
    .Subname.enGB.set("Keeper of the Blighted Grove")
    .UnitClass.MAGE.set()
    .FactionTemplate.NEUTRAL_HOSTILE.set()
    .Models.addIds(27364)
    .Weapons.add(30883)
    .Level.set(80, 80)
    .Scale.set(3)
    .Stats.ManaMod.set(1000)
    .MovementSpeed.set(1.5, 1.5)
    .NormalLoot.set(0)
    .Gold.set(0)
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .TypeFlags.BOSS.set(true)
    .UnitFlags.REGENERATE_POWER.set(true)
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.auto-set-position-z")
;



// Adds.

const maldrionAddType1 = std.CreatureTemplates
    .create("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.type-1", 11473)
    .Name.enGB.set("Maldrion: Add (type 1)")
    .Level.set(80, 80)
    .Stats.HealthMod.set(0.1)
    .MovementSpeed.set(CONFIG.addsMovementSpeed, CONFIG.addsMovementSpeed)
    .NormalLoot.set(0)
    .Gold.set(0)
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.type-1")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add-or-ghost")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.auto-set-position-z")
;

const maldrionAddType2 = std.CreatureTemplates
    .create("tswow-module-public-tests.worldbosses.maldrion", "creature_maldrion-add_type-2", 11471)
    .Name.enGB.set("Maldrion: Add (type 2)")
    .Level.set(80, 80)
    .Stats.HealthMod.set(0.1)
    .MovementSpeed.set(CONFIG.addsMovementSpeed, CONFIG.addsMovementSpeed)
    .NormalLoot.set(0)
    .Gold.set(0)
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.type-2")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add-or-ghost")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.auto-set-position-z")
;

const maldrionAddGhost = std.CreatureTemplates
    .create("tswow-module-public-tests.worldbosses.maldrion", "creature_maldrion-add.ghost", 8317)
    .Name.enGB.set("Maldrion: Add (ghost)")
    .Level.set(80, 80)
    .Stats.HealthMod.set(100)
    .RegenHealth.set(0)
    .MovementSpeed.set(CONFIG.addsMovementSpeed, CONFIG.addsMovementSpeed)
    .NormalLoot.set(0)
    .Gold.set(0)
    .SchoolImmunity.clearAll()
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .UnitFlags.NOT_SELECTABLE.set(true)
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.ghost")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add-or-ghost")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.auto-set-position-z")
;

const maldrionAddGhostKiller = std.CreatureTemplates
    .create("tswow-module-public-tests.worldbosses.maldrion", "creature_maldrion-add.ghost-killer", 32666)
    .Name.enGB.set("Maldrion: Add (ghost killer)")
    .FactionTemplate.NEUTRAL_PASSIVE.set()
    .Level.set(80, 80)
    .Icon.setInteract()
    .NormalLoot.set(0)
    .Gold.set(0)
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .NPCFlags.GOSSIP.set(true)
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.ghost-killer")
;

const maldrionAddProjectile = std.CreatureTemplates
    .create("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.projectile", 29271)
    .Name.enGB.set("Maldrion: Add (projectile)")
    .Level.set(80, 80)
    .Scale.set(0.7)
    .MovementSpeed.set(CONFIG.projectileMovementSpeed, CONFIG.projectileMovementSpeed)
    .NormalLoot.set(0)
    .Gold.set(0)
    .Difficulty.Heroic5Man.set(0)
    .Difficulty.Normal25man.set(0)
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .UnitFlags.DO_NOT_FADE_IN.set(true)
    .UnitFlags.NOT_SELECTABLE.set(true)
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion-add.projectile")
    .Tags.add("tswow-module-public-tests.worldbosses.maldrion", "creature.auto-set-position-z")
;



// Export.

export const CREATURES = {
    maldrion,
    maldrionAddType1,
    maldrionAddType2,
    maldrionAddGhost,
    maldrionAddGhostKiller,
    maldrionAddProjectile
};