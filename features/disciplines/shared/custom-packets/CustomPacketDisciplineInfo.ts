export const CUSTOM_PACKET_DISCIPLINE_INFO_OPCODE = 20;

export class CustomPacketDisciplineInfo {

    ID          : uint8;
    title       : string;
    description : string;

    constructor (ID: uint8, title: string, description: string) {
        
        this.ID             = ID;
        this.title          = title;
        this.description    = description;

    }

    read (read: TSPacketRead): void {

        this.ID             = read.ReadUInt8();
        this.title          = read.ReadString();
        this.description    = read.ReadString();

    }

    write (): TSPacketWrite {
        
        let customPacket = CreateCustomPacket(CUSTOM_PACKET_DISCIPLINE_INFO_OPCODE, 0);

        customPacket.WriteUInt8(this.ID);
        customPacket.WriteString(this.title);
        customPacket.WriteString(this.description);
        
        return customPacket;

    }

}