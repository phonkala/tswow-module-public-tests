import { std } from "wow/wotlk";



export const primalRend = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend")
    .Name.enGB.set("Primal Rend (Base Spell)")
    .Description.enGB.set("Unleash the untamed fury of nature with a savage, energy-infused laceration. Causes $s2% damage plus $s1 to the target.")
    .Icon.setFullPath("Interface/Icons/Spell_Shadow_VampiricAura")
    .PreventionType.PACIFY.set()
    .FacingCasterFlags.SPELL_FACING_FLAG_INFRONT.set(1)
    .Attributes.IS_ABILITY.set(1)
    .Attributes.MELEE_COMBAT_START.set(1)
    .SchoolMask.PHYSICAL.set(1)
    .Cooldown.mod(x=>x
        .GlobalTime.set(1500)
        .GlobalCategory.set(133)
        .Time.set(2500)
    )
    .Power.mod(x=>x
        .Type.MANA.set()
        .CostBase.set(200)
    )
    .Range.setSimple(0, 5, 1)
    .Effects.addMod(x=>x
        .Type.WEAPON_DAMAGE.set()
        .DamageBase.set(24)
        .DamageDieSides.set(1)
        .ImplicitTargetA.UNIT_TARGET_ENEMY.set()
    )
    .Effects.addMod(x=>x
        .Type.WEAPON_PERCENT_DAMAGE.set()
        .Percentage.set(200)
        .DamagePctBase.set(200)
        .DamagePctDieSides.set(1)
        .ImplicitTargetA.UNIT_TARGET_ENEMY.set()
    )
    .Visual.modRefCopy(x=>x
        .CastKit.modRefCopy(x=>x
            .Animation.ATTACK1_H_PIERCE.set()
        )
        .ImpactKit.modRefCopy(x=>x
            .ChestEffect.modRefCopy(x=>x
                .Filename.set("Spells/BloodyExplosion.mdx")
            )
            .Sound.set(3134)
        )
    )
;



export const primalRendStormclawForm = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.stormclaw-form", primalRend.ID)
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend")
    .Name.enGB.set("Primal Rend (Stormclaw Form)")
    .Cooldown.mod(x=>x
        .GlobalTime.set(1000)
        .GlobalCategory.set(133)
        .Time.set(1000)
    )
    .Power.mod(x=>x
        .Type.ENERGY.set()
        .CostBase.set(35)
    )
    .Effects.addMod(x=>x
        .Type.ADD_COMBO_POINTS.set()
        .CountBase.set(0)
        .CountDieSides.set(1)
        .ImplicitTargetA.UNIT_TARGET_ENEMY.set()
    )
;



export const primalRendRank1 = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-1", primalRend.ID)
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-1")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-1+")
    .Name.enGB.set("Primal Rend 1")
    .Subtext.enGB.set("Rank 1")
;



export const primalRendRank2 = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-2", primalRendStormclawForm.ID)
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-2")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-2+")
    .Name.enGB.set("Primal Rend 2")
    .Subtext.enGB.set("Rank 2")
;



export const primalRendRank3 = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-3", primalRend.ID)
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-3")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-3+")
    .Name.enGB.set("Primal Rend 3")
    .Subtext.enGB.set("Rank 3")
;



export const primalRendRank4 = std.Spells
    .create("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-4", primalRendStormclawForm.ID)
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-4")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend")
    .Tags.add("tswow-module-public-tests.classes.archdruid.abilities", "spell.primal-rend.rank-4+")
    .Name.enGB.set("Primal Rend 4")
    .Subtext.enGB.set("Rank 4")
;



primalRendRank1.Rank.set(primalRendRank1.ID, 1);
primalRendRank2.Rank.set(primalRendRank1.ID, 2);
primalRendRank3.Rank.set(primalRendRank1.ID, 3);
primalRendRank4.Rank.set(primalRendRank1.ID, 4);



//console.log(std.Spells.load(5221).objectify({}));