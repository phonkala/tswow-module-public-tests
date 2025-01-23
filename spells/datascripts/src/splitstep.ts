import { std } from "wow/wotlk";



export const splitstep = std.Spells
    .create("tswow-module-public-tests.spells", "spell.splitstep")
    .Name.enGB.set("Splitstep")
    .Description.enGB.set("Dash forward (diagonally right) and then dash a second time (diagonally left).")
    .Duration.setSimple(5000)
    .Cooldown.Time.set(30000)
    .Cooldown.GlobalTime.set(1500)
    .Attributes.HIDE_FROM_AURA_BAR.set(1)
    .AuraInterruptFlags.setBit(25, 1)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.DUMMY.set()
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.splitstep")
;



export const splitstepSecond = std.Spells
    .create("tswow-module-public-tests.spells", "spell.splitstep-second")
    .Name.enGB.set("Splitstep (second)")
    .Duration.setSimple(5000)
    .Attributes.HIDE_FROM_AURA_BAR.set(1)
    .AuraInterruptFlags.setBit(25, 1)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.DUMMY.set()
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.splitstep-second")
;



export const splitstepThird = std.Spells
    .create("tswow-module-public-tests.spells", "spell.splitstep-third")
    .Name.enGB.set("Splitstep (third)")
    .Duration.setSimple(5000)
    .Attributes.HIDE_FROM_AURA_BAR.set(1)
    .AuraInterruptFlags.setBit(25, 1)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.DUMMY.set()
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.splitstep-third")
;