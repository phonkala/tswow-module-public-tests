import { std } from "wow/wotlk";

import { SPELL_IDS } from "./spells";



// Add a parabola missile motion.
std.DBC.SpellMissileMotion.add(10000, {
        
    Name: "Missile (x5, multitarget)",
    ScriptBody:

        `local function sinapprox(v)

        local t1 = 1.1*v/360
        local t2 = (t1*0.5 - math.floor(t1*0.5))*2-1
        return -4*(t2 - t2 * math.abs(t2))
        --return sin(v)
        end

        local spinRate = 60
        modelRoll = time * spinRate
        speedScalar = 0.2 + 3 * progress * progress

        local progressMult = math.min(0.6,sin(progress*180))*(1-progress)

        local t1 = (time+rand1*4)*50
        local noise1 = sinapprox(t1)*sinapprox(t1*3)*sinapprox(t1*.54)*sinapprox(t1*7)*sinapprox(t1*12)*sinapprox(t1*.5)

        local t2 = (time+rand2*4)*50
        local noise2 = sinapprox(t2)*sinapprox(t2*3)*sinapprox(t2*.54)*sinapprox(t2*7)*sinapprox(t2*10)*sinapprox(t2*.5)

        local t3 = (time+rand3*4)*50
        local noise3 = sinapprox(t3)*sinapprox(t3*3)*sinapprox(t3*.54)*sinapprox(t3*7)*sinapprox(t3*10)*sinapprox(t3*.5)

        local factor = 1.4
        transRight = progressMult*noise1*14*factor
        transUp = progressMult*noise2*4*factor + (progress*(1-progress))*20
        transFront = progressMult*noise3*14*factor`,

    Flags: 0,
    MissileCount: 5

});



SPELL_IDS["wrath"].forEach((spellID) => {

    std.Spells
        .load(spellID)
        .Speed.set(50)
        .Attributes.AREA_TARGET_CHAIN.set(1)
        .Effects.mod(0, x=>x
            .ChainTarget.set(3)
        )
        .Visual.modRefCopy(x=>x
            .PrecastKit.set(345)
            .CastKit.set(181)
            .ImpactKit.set(7087)
            .Missile.Model.modRefCopy(x=>x
                .Scale.set(0.5, 0.5, 0.5)
            )
            .row.MissileMotion.set(10000)
        )
    ;

});