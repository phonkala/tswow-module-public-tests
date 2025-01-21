import { std } from "wow/wotlk";



// TODO: Need to add aura to allow casting while flying/falling/moving.
// TODO: Add cooldown reduction if certain aura is active (Metamorphosis).

export const alight = std.Spells
    .create("tswow-module-public-tests.spells", "spell.alight")
    .Name.enGB.set("Alight")
    .Description.enGB.set("Launch yourself 40 yd into the air and slowfall.")
    .Duration.setSimple(10000)
    .Cooldown.Time.set(60000)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.FEATHER_FALL.set()
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.alight")
;