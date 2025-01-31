export function Main(events: TSEvents) {
    
    

    events.Creature.OnGossipHello(UTAG("tswow-module-public-tests.minigames.beam-puzzle", "creature.beam-reflector"), (creature, player, cancel) => {

        // Add gossip menu items.

        cancel.set(true);
        
        player.GossipClearMenu();

        player.GossipMenuAddItem(GossipOptionIcon.INTERACT_1, "Move: NORTH."    , 0, 1);
        player.GossipMenuAddItem(GossipOptionIcon.INTERACT_1, "Move: EAST."     , 0, 2);
        player.GossipMenuAddItem(GossipOptionIcon.INTERACT_1, "Move: SOUTH."    , 0, 3);
        player.GossipMenuAddItem(GossipOptionIcon.INTERACT_1, "Move: WEST"      , 0, 4);
        player.GossipMenuAddItem(GossipOptionIcon.INTERACT_1, "Face: NORTH."    , 0, 5);
        player.GossipMenuAddItem(GossipOptionIcon.INTERACT_1, "Face: EAST."     , 0, 6);
        player.GossipMenuAddItem(GossipOptionIcon.INTERACT_1, "Face: SOUTH."    , 0, 7);
        player.GossipMenuAddItem(GossipOptionIcon.INTERACT_1, "Face: WEST."     , 0, 8);
    
        player.GossipSendTextMenu(creature, "Testing");

    });



    events.Creature.OnGossipSelect(UTAG("tswow-module-public-tests.minigames.beam-puzzle", "creature.beam-reflector"), (creature, player, menuId, selectionId, cancel) => {

        // Add gossip menu actions.

        switch ( selectionId ) {

            case 1: 
                creature.MoveJump(creature.GetPosition().x + 10, creature.GetPosition().y, creature.GetPosition().z, 10, 0, 0);
                break;
            case 2: 
                creature.MoveJump(creature.GetPosition().x, creature.GetPosition().y - 10, creature.GetPosition().z, 10, 0, 0);
                break;
            case 3: 
                creature.MoveJump(creature.GetPosition().x - 10, creature.GetPosition().y, creature.GetPosition().z, 10, 0, 0);
                break;
            case 4: 
                creature.MoveJump(creature.GetPosition().x, creature.GetPosition().y + 10, creature.GetPosition().z, 10, 0, 0);
                break;
            case 5: 
                creature.SetFacing(0);
                break;
            case 6: 
                creature.SetFacing(Math.PI * 1.5);
                break;
            case 7: 
                creature.SetFacing(Math.PI);
                break;
            case 8: 
                creature.SetFacing(Math.PI * 0.5);
                break;

        }

        player.GossipComplete();
        
    });
    
}