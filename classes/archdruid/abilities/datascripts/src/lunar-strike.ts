import { std } from "wow/wotlk";



export const lunarStrike = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.lunar-strike")
    .Name.enGB.set("Archdruid: Lunar Strike")
    .Range.setSimple(0, 5)
    .Effects.addMod(x=>x
        .Type.SCHOOL_DAMAGE.set()
        .DamageBase.set(9)
        .DamageDieSides.set(1)
        .ImplicitTargetA.UNIT_TARGET_ENEMY.set()
    )
    .Effects.addMod(x=>x
        .Type.ACTIVATE_RUNE.set()
        .RuneType.DEATH.set()
        .CountBase.set(1, "EFFECTIVE")
        .CountBase.set(0, "STORED")
        .CountDieSides.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
;