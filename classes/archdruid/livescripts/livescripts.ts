export function Main(events: TSEvents) {
    


    events.Player.OnLogin((player, firstLogin) => {
        convertRunes(player);
    });

    events.Player.OnReload((player, firstLogin) => {
        convertRunes(player);
    })



    function convertRunes(player: TSPlayer) {

        // Convert all runes to Death Runes, if player's class isn't Death Knight.
                
        if ( player.GetClass() == UTAG("tswow-module-public-tests.classes.archdruid", "class") ) {
            
            for ( let i = 0; i < 6; i++ ) {
                player.SetBaseRune(i, 3);
                player.ConvertRune(i, 3);
            }

            player.ResyncRunes();

        }

    }



}