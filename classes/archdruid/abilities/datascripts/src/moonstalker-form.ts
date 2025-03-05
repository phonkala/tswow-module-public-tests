import { std } from "wow/wotlk";



export const moonstalkerForm = std.Spells
    .create('tswow-module-public-tests.classes.archdruid.abilities','spell.moonstalker-form')
    .Tags.addUnique('tswow-module-public-tests.classes.archdruid.abilities','spell.moonstalker-form')
    .Name.enGB.set("Moonstalker Form")
    .Description.set({"enGB":"Shapeshift into Moonstalker form, increasing melee attack power by $3025s1 plus Agility.  Also protects the caster from Polymorph effects and allows the use of various cat abilities.\r\n\r\nThe act of shapeshifting frees the caster of Polymorph and Movement Impairing effects."})
    .AuraDescription.set({"enGB":"Immunity to Polymorph effects.  Increases melee attack power by $3025s1 plus Agility."}) 
    .Subtext.set({"enGB":"Shapeshift"})
    .Icon.setFullPath("Interface/Icons/Ability_Druid_CatForm")
    .Attributes.IS_ABILITY.set(1)
    .Attributes.DISPEL_AURA_ON_IMMUNITY.set(1)
    .Duration.setSimple(15000, 0, 15000)
    .Cooldown.GlobalTime.set(1500)
    .Cooldown.GlobalCategory.set(133)
    .Cooldown.Time.set(1500) // TODO
    .Power.Type.ENERGY.set()
    .Power.CostPercent.set(0)
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MOD_SHAPESHIFT.set()
        .Form.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.MECHANIC_IMMUNITY.set()
        .Mechanic.NONE.set()
        .ImplicitTargetA.UNIT_CASTER.set()
    )
    .Effects.addMod(x=>x
        .Type.APPLY_AURA.set()
        .Aura.PERIODIC_TRIGGER_SPELL.set()
        .ImplicitTargetA.UNIT_CASTER.set()
        .AuraPeriod.set(5000)
    )
    .Visual.modRefCopy(x=>x
        .ImpactKit.modRefCopy(x=>x
            .BaseEffect.modRefCopy(x=>x
                .Filename.set("Spells\\DruidMorph_Impact_Base.mdx")
                .AreaSize.set(0)
            )
            .Sound.set(4121)
        )
        .PrecastKit.modRefCopy(x=>x
            .addBothHands(x=>x
                .Filename.set("Spells\\Nature_PreCast_Low_Hand.mdx")
                .AreaSize.set(1)
            )
            .Sound.set(27)
            .Animation.READY_SPELL_OMNI.set()
        )
    )
;