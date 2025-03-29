@CharactersTable export class ORMDisciplinesXP extends DBEntry {
    
    @DBPrimaryKey   playerGUID          : TSGUID    = CreateGUID(0, 0);
    @DBField        activeDisciplineID  : uint8     = 0;
    @DBField        discipline1XP       : int32     = -1;
    @DBField        discipline2XP       : int32     = -1;
    @DBField        discipline3XP       : int32     = -1;
    @DBField        discipline4XP       : int32     = -1;
    @DBField        discipline5XP       : int32     = -1;
    @DBField        discipline6XP       : int32     = -1;

    constructor (playerGUID: TSGUID) {
        super();
        this.playerGUID = playerGUID;
    }

    static load (player: TSPlayer): ORMDisciplinesXP {
        return player.GetObject("ORMDisciplinesXP", LoadDBEntry(new ORMDisciplinesXP(player.GetGUID())));
    }

    static save (player: TSPlayer) {
        ORMDisciplinesXP.load(player).Save();
    }

    static destroy (playerGuid: TSGUID) {
        LoadDBEntry(new ORMDisciplinesXP(playerGuid)).Delete();
    }

}