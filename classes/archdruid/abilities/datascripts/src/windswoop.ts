import { std } from "wow/wotlk";



export const windswoopKnockback = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop.knockback")
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop.knockback")
    .Name.enGB.set("Windswoop")
    .AuraDescription.enGB.set("Dazed.")
    .Icon.setFullPath("Interface/Icons/Spell_Frost_Stun")
    .Attributes.NO_INITIAL_AGGRO.set(1)
    .Attributes.NO_THREAT.set(1)
    .Duration.setSimple(3000)
    .Effects.addMod(x=>x
        .Type.KNOCK_BACK.set()
        .HeightBase.set(200)
        .KnockbackAmount.set(50)
        .ImplicitTargetA.UNIT_SRC_AREA_ENEMY.set()
        .Radius.setSimple(10)
    )
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MOD_DECREASE_SPEED.set()
        .PercentBase.set(-51)
        .PercentDieSides.set(1)
        .ImplicitTargetA.UNIT_SRC_AREA_ENEMY.set()
        .Radius.setSimple(10)
    )
;



export const windswoopKnockbackAura = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop.knockback-aura")
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop.knockback-aura")
    .Name.enGB.set("Windswoop")
    .Icon.setFullPath("Interface/Icons/Ability_Druid_FlightForm")
    .Attributes.START_PERIODIC_AT_APPLY.set(1)
    .Attributes.HIDE_DURATION.set(1)
    .Duration.setSimple(5000)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.PERIODIC_TRIGGER_SPELL.set()
        .AuraPeriod.set(100)
        .TriggerSpell.set(windswoopKnockback.ID)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MOD_SHAPESHIFT.set()
        .Form.set(29)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Visual.modRefCopy(x=>x
        .PrecastKit.modRefCopy(x=>x
            .addBothHands(x=>x
                .Filename.set("Spells/Nature_PreCast_Low_Hand.mdx")
            )
            .Sound.set(27)
            .Animation.READY_SPELL_OMNI.set()
            .StartAnimation.set(-1)
        )
        .CastKit.modRefCopy(x=>x
            .addBothHands(x=>x
                .Filename.set("Spells/Nature_Cast_Hand.mdx")
            )
            .Sound.set(2561)
            .Animation.SPELL_CAST_OMNI.set()
            .StartAnimation.set(-1)
        )
        .StateKit.modRefCopy(x=>x
            .BaseEffect.modRefCopy(x=>x
                .Name.set("Cyclone State")
                .Filename.set("Spells/Cyclone_State.mdx")
                .Scale.set(2, 2, 2)
            )
            .StartAnimation.set(-1)
        )
        .ImpactKit.modRefCopy(x=>x
            .BaseEffect.modRefCopy(x=>x
                .Filename.set("Spells/DruidMorph_Impact_Base.mdx")
            )
            .Sound.set(10893)
            .Animation.set(-1)
            .StartAnimation.set(-1)
        )
    )
;



export const windswoop = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop")
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid.abilities", "spell.windswoop")
    .Name.enGB.set("Windswoop")
    .Icon.setFullPath("Interface/Icons/Ability_Druid_FlightForm")
    .TargetType.DEST_LOCATION.set(1)
    .Range.setSimple(0, 60)
    .Cooldown.GlobalTime.set(1500)
    .Cooldown.Time.set(5000)
    .Effects.addMod(x=>x
        .Type.DUMMY.set()
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Effects.addMod(x=>x
        .Type.CHARGE_DEST.set()
        .ImplicitTargetA.UNK_DEST_AREA_UNK107.set()
        .Radius.setSimple(1)
    )
;



export const windswoopAuraRemover = std.CreatureTemplates
    .create("tswow-module-public-tests.classes.archdruid.abilities", "creature.windswoop-aura-remover")
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid.abilities", "creature.windswoop-aura-remover")
    .Name.enGB.set("Windswoop Aura Remover")
    .Models.addIds(328)
    .UnitFlags.NOT_SELECTABLE.set(1)
    .Scripts.onJustCreated(x=>x
        .Action.setSetVisibility(0).Target.setSelf()
    )
;