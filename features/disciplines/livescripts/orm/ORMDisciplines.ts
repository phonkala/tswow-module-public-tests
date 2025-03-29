@CharactersTable export class ORMDisciplines extends DBEntry {
    
    @DBPrimaryKey   ID              : uint8     = 0;
    @DBField        machineName     : string    = "";
    @DBField        isEnabled       : uint8     = 1;
    @DBField        title           : string    = "";
    @DBField        description     : string    = "";
    @DBField        discoveryHint   : string    = "";

    constructor (ID: uint8) {
        super();
        this.ID = ID;
    }

    static load (ID: uint8): ORMDisciplines {
        return LoadDBEntry(new ORMDisciplines(ID));
    }

    static save (ID: uint8) {
        ORMDisciplines.load(ID).Save();
    }

    static destroy (ID: uint8) {
        LoadDBEntry(new ORMDisciplines(ID)).Delete();
    }

}