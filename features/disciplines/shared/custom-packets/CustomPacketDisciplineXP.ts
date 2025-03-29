export const CUSTOM_PACKET_DISCIPLINE_XP_OPCODE = 21;

export class CustomPacketDisciplineXP {

    ID          : uint8;
    isActive    : uint8;
    XP          : int32;

    constructor (ID: uint8, isActive: uint8, XP: int32) {
        
        this.ID         = ID;
        this.isActive   = isActive;
        this.XP         = XP;

    }

    read (read: TSPacketRead): void {

        this.ID         = read.ReadUInt8();
        this.isActive   = read.ReadUInt8();
        this.XP         = read.ReadInt32();

    }

    write (): TSPacketWrite {
        
        let customPacket = CreateCustomPacket(CUSTOM_PACKET_DISCIPLINE_XP_OPCODE, 0);

        customPacket.WriteUInt8(this.ID);
        customPacket.WriteUInt8(this.isActive);
        customPacket.WriteInt32(this.XP);
        
        return customPacket;

    }

}