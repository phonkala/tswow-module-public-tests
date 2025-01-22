export function Main(events: TSEvents) {


    const CONFIG = {
        maxElevation: 20,
        jumpSpeed: 50
    }



    events.Spell.OnCast(UTAG("tswow-module-public-tests.spells", "spell.splitstep"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;
        
        const newPosition = calcNewPosition(caster.GetPosition().x, caster.GetPosition().y, caster.GetPosition().z, caster.GetPosition().o, -0.5);
        const newPositionZ = caster.GetMap().GetHeight(newPosition.x, newPosition.y, 0);

        if ( newPositionZ > caster.GetPosition().z - CONFIG.maxElevation && newPositionZ < caster.GetPosition().z + CONFIG.maxElevation ) {

            caster.MoveJump(newPosition.x, newPosition.y, newPositionZ, CONFIG.jumpSpeed, 0, 0);
            
            caster.CastSpell(caster, UTAG("tswow-module-public-tests.spells", "spell.splitstep-left"), true);

        }

    });



    events.Spell.OnCast(UTAG("tswow-module-public-tests.spells", "spell.splitstep-left"), (spell) => {

        const caster = ToPlayer(spell.GetCaster());
        if ( !caster ) return;
        
        const newPosition = calcNewPosition(caster.GetPosition().x, caster.GetPosition().y, caster.GetPosition().z, caster.GetPosition().o, 0.5);
        const newPositionZ = caster.GetMap().GetHeight(newPosition.x, newPosition.y, 0);

        if ( newPositionZ > caster.GetPosition().z - CONFIG.maxElevation && newPositionZ < caster.GetPosition().z + CONFIG.maxElevation ) {

            caster.MoveJump(newPosition.x, newPosition.y, newPositionZ, CONFIG.jumpSpeed, 0, 0);

        }

    });



    function calcNewPosition (x: number, y: number, z: number, o: number, angle: number): { x: number, y: number, z: number, o:number } {
        
        const newOrientation = o + angle;
        
        const newX = x + 20 * Math.cos(newOrientation);
        const newY = y + 20 * Math.sin(newOrientation);
    
        return { x: newX, y: newY, z: z, o: newOrientation };
        
    }

}