export function Main(events: TSEvents) {
    


    // Keep track of units in combat.

    const unitsInCombat: Map<string, Set<string>> = new Map();



    events.Unit.OnEnterCombatWith((me, other) => {
        
        const unit1 = me;
        const unit1Key = unit1.GetMapID() + "-" + unit1.GetGUIDLow();

        const unit2 = other;
        const unit2Key = unit2.GetMapID() + "-" + unit2.GetGUIDLow();

        let player = ToPlayer(unit1);
        if ( !player ) { player = ToPlayer(unit2); }
        if ( !player ) return;

        

        // Add the unit IDs as keys if they don't exist.

        if ( !unitsInCombat.has(unit1Key) ) {
            unitsInCombat.set(unit1Key, new Set());
        }
        
        if ( !unitsInCombat.has(unit2Key) ) {
            unitsInCombat.set(unit2Key, new Set());
        }

        // Now we got the unit IDs added as keys, add the corresponding IDs to the Sets.
        unitsInCombat.get(unit1Key)!.add(unit2Key);
        unitsInCombat.get(unit2Key)!.add(unit1Key);

        

        sendCustomPacketUnitsInCombat(player, outputUnitsInCombat("> event: OnEnterCombatWith"));

    });



    events.Unit.OnExitCombat((unit) => {
        
        let player = ToPlayer(unit);
        if ( !player ) return;

        unitsInCombat.clear();

        sendCustomPacketUnitsInCombat(player, outputUnitsInCombat("> event: OnExitCombat"));

    });



    // Helper functions.



    function outputUnitsInCombat (event?: string): string {

        let output = "";
        
        if ( event ) {
            output += event + "\r\n";
        }
    
        unitsInCombat.forEach((unitInCombatSet, unitID) => {
            output += "- Unit #" + unitID.split("-")[1] + " in combat with units [#" + Array.from(unitInCombatSet).map(unitKey => unitKey.split("-")[1]).join(", #") + "]\r\n";
        });
    
        return output;
    
    }
    
    
    
    function sendCustomPacketUnitsInCombat (player: TSPlayer, msg: string) {
        let packet = CreateCustomPacket(50, 0);
        packet.WriteString(msg);
        packet.SendToPlayer(player);
    };

}
