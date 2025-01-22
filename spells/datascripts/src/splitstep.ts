import { std } from "wow/wotlk";



export const splitstep = std.Spells
    .create("tswow-module-public-tests.spells", "spell.splitstep")
    .Name.enGB.set("Splitstep")
    .Description.enGB.set("Dash forward (diagonally right) and then dash a second time (diagonally left).")
    .Cooldown.Time.set(1500)
    .Cooldown.GlobalTime.set(1500)
    .Effects.addMod(x=>x
        .Type.DUMMY.set()
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.splitstep")
;



export const splitstepLeft = std.Spells
    .create("tswow-module-public-tests.spells", "spell.splitstep-left")
    .Name.enGB.set("Splitstep (left)")
    .Effects.addMod(x=>x
        .Type.DUMMY.set()
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Tags.addUnique("tswow-module-public-tests.spells", "spell.splitstep-left")
;