export function Main(events: TSEvents) {



    // TODO: Had to add third jump to "fix" player final orientation as there was no way to do that in core without making camera act weird.



    const CONFIG = {
        maxElevation    : 20,
        jumpDistance    : 15,
        jumpSpeed       : 50,
        initialAngle    : -0.5 // In radians.
    }



    events.Spell.OnCast(UTAG("tswow-module-public-tests.spells", "spell.splitstep"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;
        
        const newPosition = calcNewPosition(caster.GetPosition().x, caster.GetPosition().y, caster.GetPosition().z, caster.GetPosition().o, CONFIG.initialAngle, CONFIG.jumpDistance);
        
        dashToPosition(caster, newPosition.x, newPosition.y, newPosition.z, 0);

    });



    events.Spell.OnRemove(UTAG("tswow-module-public-tests.spells", "spell.splitstep"), (effect, application, type) => {

        const caster = ToPlayer(effect.GetCaster());
        if ( !caster ) return;
        
        caster.CastSpell(caster, UTAG("tswow-module-public-tests.spells", "spell.splitstep-second"), true);

    });



    events.Spell.OnCast(UTAG("tswow-module-public-tests.spells", "spell.splitstep-second"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;
        
        const newPosition = calcNewPosition(caster.GetPosition().x, caster.GetPosition().y, caster.GetPosition().z, caster.GetPosition().o, -(CONFIG.initialAngle * 2), CONFIG.jumpDistance);
        
        dashToPosition(caster, newPosition.x, newPosition.y, newPosition.z, 0);

    });



    events.Spell.OnRemove(UTAG("tswow-module-public-tests.spells", "spell.splitstep-second"), (effect, application, type) => {

        const caster = ToPlayer(effect.GetCaster());
        if ( !caster ) return;
        
        caster.CastSpell(caster, UTAG("tswow-module-public-tests.spells", "spell.splitstep-third"), true);

    });



    events.Spell.OnCast(UTAG("tswow-module-public-tests.spells", "spell.splitstep-third"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;

        const newPosition = calcNewPosition(caster.GetPosition().x, caster.GetPosition().y, caster.GetPosition().z, caster.GetPosition().o, CONFIG.initialAngle, 10);
        
        dashToPosition(caster, newPosition.x, newPosition.y, newPosition.z, 10);

    });

    

    // Helper functions.
    


    function calcNewPosition (x: number, y: number, z: number, o: number, angle: number, distance: number): { x: number, y: number, z: number } {
        
        const newOrientation = o + angle;
        
        const newX = x + distance * Math.cos(newOrientation);
        const newY = y + distance * Math.sin(newOrientation);
    
        return { x: newX, y: newY, z: z };
        
    }



    function dashToPosition (player: TSPlayer, x: number, y: number, z: number, maxHeight: number) {

        const newPositionZ = player.GetMap().GetHeight(x, y, 0);

        if ( z > player.GetPosition().z - CONFIG.maxElevation && z < player.GetPosition().z + CONFIG.maxElevation ) {

            player.MoveJump(x, y, newPositionZ, CONFIG.jumpSpeed, maxHeight, 0);

        }

    }

}