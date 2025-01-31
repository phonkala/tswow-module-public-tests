import { CONFIG } from "../datascripts/config";
import { CONFIG as CONFIG_MALDRION } from "../maldrion/datascripts/config";



export function Main(events: TSEvents) {
    


    events.Creature.OnGossipHello(UTAG("tswow-module-public-tests.worldbosses", "creature.world-boss-summoner"), (creature, player, cancel) => {

        // Add gossip menu items.

        cancel.set(true);

        player.GossipClearMenu();

        if ( CONFIG_MALDRION.isActive )  {
            player.GossipMenuAddItem(GossipOptionIcon.BATTLE, "Summon Maldrion", 0, 1);
        }

        // TODO: For some reason having just one menu item triggers in OnGossipHello.
        player.GossipMenuAddItem(GossipOptionIcon.BATTLE, "DUMMY", 0, 2);

        player.GossipSendTextMenu(creature, "So you wish to test your strength huh?");

    });

    

    events.Creature.OnGossipSelect(UTAG("tswow-module-public-tests.worldbosses", "creature.world-boss-summoner"), (creature, player, menuId, selectionId, cancel) => {

        // Summon world bosses.

        // TODO: Add check to only summon world boss if none (in range) are in combat.
        // TODO: Add option to clear the bosses (same check required as above).

        switch ( selectionId ) {

            case 1:

                if ( CONFIG_MALDRION.isActive )  {
                    creature.GetMap().SpawnCreature(UTAG("tswow-module-public-tests.worldbosses.maldrion", "creature.maldrion"), CONFIG.bossSpawnPosition.x, CONFIG.bossSpawnPosition.y, CONFIG.bossSpawnPosition.z, CONFIG.bossSpawnPosition.o, 0, 1);
                }

                break;

        }

        player.GossipComplete();

    });

}