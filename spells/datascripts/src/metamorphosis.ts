import { std } from "wow/wotlk";



// TODO: This one has so many effects, we probably need one or two additional spells/auras to do it all.
// Metamorphosis form, armor increase and movement speed increase can probably be done in the base spell.
// Spell/melee/ranged haste require one spell for them, I assume.
// Auto attack range increase and splash aoe chaos damage can be in one more spell.
// Currently no idea how to increase melee attack range.

export const metamorphosis = std.Spells
    .create("tswow-module-public-tests.spells", "spell.metamorphosis")
    .Name.enGB.set("Metamorphosis")
    .Description.enGB.set("All runes become death runes, haste and movement speed increased by 35%, and armor is increased by 100%. Auto attacks gain 60yd range and deal splash chaos damage.")
    .Duration.setSimple(45000)
    .Cooldown.Time.set(18000)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MOD_INCREASE_SPEED.set()
        .PercentBase.set(34)
        .PercentDieSides.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.metamorphosis")
;

console.log(std.Spells.load(588).codify({}));