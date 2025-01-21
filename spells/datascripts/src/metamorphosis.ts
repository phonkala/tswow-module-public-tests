import { std } from "wow/wotlk";



// TODO: This one has so many effects, we need multiple spells/auras to do it all.
// Currently extending melee range isn't possible without core edits afaik.
// Also, extending melee range and changing all runes to death runes for the duration probably has to be done in livescripts.



// Some shared settings, as the functionality is divided into multiple spells.
const CONFIG = {
    duration: 45000,
    cooldown: 10000
}



const metamorphosisModifyMovementSpeedAndArmor = std.Spells
    .create("tswow-module-public-tests.spells", "spell.metamorphosis.modify-movement-speed-and-armor")
    .Name.enGB.set("Metamorphosis (modify movement speed and armor)")
    .Icon.set(0)
    .Duration.setSimple(CONFIG.duration)
    .Cooldown.Time.set(CONFIG.cooldown)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MOD_INCREASE_SPEED.set()
        .PercentBase.set(34)
        .PercentDieSides.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .MiscValueA.set(1)
        .Aura.MOD_RESISTANCE_PCT.set()
        .PercentBase.set(99)
        .PercentDieSides.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.metamorphosis.modify-movement-speed-and-armor")
;



const metamorphosisModifyHaste = std.Spells
    .create("tswow-module-public-tests.spells", "spell.metamorphosis.modify-haste")
    .Name.enGB.set("Metamorphosis (modify haste)")
    .Icon.set(0)
    .Duration.setSimple(CONFIG.duration)
    .Cooldown.Time.set(CONFIG.cooldown)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MOD_MELEE_RANGED_HASTE.set()
        .PercentBase.set(34)
        .PercentDieSides.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MOD_SCALE.set()
        .PercentBase.set(34)
        .PercentDieSides.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MOD_CASTING_SPEED_NOT_STACK.set()
        .PercentBase.set(34)
        .PercentDieSides.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.metamorphosis.modify-haste")
;



export const metamorphosis = std.Spells
    .create("tswow-module-public-tests.spells", "spell.metamorphosis")
    .Name.enGB.set("Metamorphosis")
    .Description.enGB.set("All runes become death runes, haste and movement speed increased by 35%, and armor is increased by 100%. Auto attacks gain 60 yd range and deal splash chaos damage.")
    .Duration.setSimple(CONFIG.duration)
    .Cooldown.Time.set(CONFIG.cooldown)
    .Effects.addMod(x=>x
        .Type.TRIGGER_SPELL.set()
        .TriggerSpell.set(metamorphosisModifyMovementSpeedAndArmor.ID)
    )
    .Effects.addMod(x=>x
        .Type.TRIGGER_SPELL.set()
        .TriggerSpell.set(metamorphosisModifyHaste.ID)
    )
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.DUMMY.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.metamorphosis")
;