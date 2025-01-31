import { std } from "wow/wotlk";

import { CONFIG } from "../config";



// TODO: Use std.Spells.create() instead of .load() to actually create new spells, otherwise the modifications done here modify the original spells.



// Boss spells.

const immunity = std.Spells
    .load(52982)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Visual.modRefCopy(x=>x
        .ImpactKit.modRefCopy(x=>x.clear())
    )
;

const wrath = std.Spells
    .load(5176)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const starfire = std.Spells
    .load(2912)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const rejuvenation = std.Spells
    .load(774)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const regrowth = std.Spells
    .load(8936)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;

const cat_form = std.Spells
    .load(768)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const feral_charge_cat = std.Spells
    .load(49376)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const claw = std.Spells
    .load(1082)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(5)
;
const mangle_cat = std.Spells
    .load(33876)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(10)
;
const rake = std.Spells
    .load(1822)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(10)
;
const rip = std.Spells
    .load(49800)
;
const ferocious_bite = std.Spells
    .load(22568)
;

const moonkin_form = std.Spells
    .load(24858)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const typhoon = std.Spells
    .load(50516)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const starfall = std.Spells
    .load(48505)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;

const bear_form = std.Spells
    .load(9634)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const feral_charge_bear = std.Spells
    .load(16979)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const mangle_bear = std.Spells
    .load(33878)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const lacerate = std.Spells
    .load(33745)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const swipe_bear = std.Spells
    .load(779)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;

const frenzy = std.Spells
    .load(28131)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const barkskin = std.Spells
    .load(22812)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const enrage = std.Spells
    .load(5229)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const frenzied_regeneration = std.Spells
    .load(22842)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;

const blood_boil = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.blood-boil", 49940)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Effects.mod(0, x=>x
        .Radius.set(30)
    )
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.blood-boil")
;



// Adds spells.

const unholy_aura = std.Spells
    .load(27987)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const power_ball_visual = std.Spells
    .load(54141)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;
const power_ball_damage_trigger = std.Spells
    .load(54207)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
;

const activate_ghost_killer = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion-add.ghost-killer.activate-ghost-killer")
    .Name.enGB.set("Activate Ghost Killer")
    .CastTime.setSimple(1500, 0, 1500)
    .Range.setSimple(0, 10)
    .Effects.addMod(x=>x
        .Type.DUMMY.set()
        .ImplicitTargetA.DEST_TARGET_ANY.set()
    )
    .InterruptFlags.ON_MOVEMENT.set(true)
    .InterruptFlags.ON_INTERRUPT_CAST.set(true)
    .InterruptFlags.ON_INTERRUPT.set(true)
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion-add.ghost-killer.activate-ghost-killer")
;

const drain_ghost = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion-add.ghost-killer.drain-ghost", 46153)
    .Name.enGB.set("Drain Ghost")
    .Duration.setSimple(6000, 0, 6000)
    .Range.setSimple(0, CONFIG.addsDistanceFromBoss + 10)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Attributes.CAN_TARGET_NOT_IN_LOS.set(true)
    .Attributes.IGNORE_HIT_RESULT.set(true)
    .Attributes.IGNORE_IMMUNE_FLAGS.set(true)
    .Attributes.IGNORE_RESISTANCES.set(true)
    .Effects.mod(0, x=>x
        .Aura.PERIODIC_DAMAGE.set().DamageBase.set(1000).DamagePeriod.set(10)
        .ImplicitTargetA.UNIT_TARGET_ANY.set()
    )
    .InterruptFlags.clearAll()
    .AuraInterruptFlags.clearAll()
    .ChannelInterruptFlags.clearAll()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion-add.ghost-killer.drain-ghost")
;



// Auras.
// TODO: Currently just some random buffs.

const reduce_spell_damage_taken = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reduce-spell-damage-taken", 23028) // 27518
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reduce-spell-damage-taken")
;
const increace_spell_damage = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-spell-damage", 23028) // 14799
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-spell-damage")
;
const reduce_physical_damage_taken = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reduce-physical-damage-taken", 14752) // 34337
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reduce-physical-damage-taken")
;
const increace_physical_damage = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-physical-damage", 1126) // 63391
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-physical-damage")
;
const reflect_damage = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reflect-damage", 467) // 15696
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.reflect-damage")
;
const increase_resistances = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-resistances", 976) // 18681
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-resistances")
;
const increase_armor = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-armor", 588) // 11348
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-armor")
;
const increase_health = std.Spells
    .create("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-health", 1243) // 2378
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("tswow-module-public-tests.worldbosses.maldrion", "spell.maldrion.increase-health")
;



// Export.

export const SPELLS = {

    immunity,

    wrath,
    starfire,
    rejuvenation,
    regrowth,

    cat_form,
    feral_charge_cat,
    claw,
    mangle_cat,
    rake,
    rip,
    ferocious_bite,

    moonkin_form,
    typhoon,
    starfall,

    bear_form,
    feral_charge_bear,
    mangle_bear,
    lacerate,
    swipe_bear,

    frenzy,
    barkskin,
    enrage,
    frenzied_regeneration,
    blood_boil,

    unholy_aura,
    power_ball_visual,
    power_ball_damage_trigger,
    activate_ghost_killer,
    drain_ghost

};

export const AURAS = {
    reduce_spell_damage_taken,
    increace_spell_damage,
    reduce_physical_damage_taken,
    increace_physical_damage,
    reflect_damage,
    increase_resistances,
    increase_armor,
    increase_health
};