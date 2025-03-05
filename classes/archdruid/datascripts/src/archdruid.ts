import { std } from "wow/wotlk";



export const archdruid = std.Classes
    .create("tswow-module-public-tests.classes.archdruid", "archdruid", "DEATH_KNIGHT")
    .Name.enGB.set("Arch Druid")
    .Races.add(["NIGHTELF", "TROLL"])
    .Roles.set(true, true, true)
    .UI.Color.set(0x8a6be6)
    .UI.setIcon(std.Image.readFromModule("tswow-module-public-tests", "classes/archdruid/assets/Interface/Icons/Ability_Druid_KingoftheJungle.png"))
    .UI.ButtonPos.setRelativeTo("CharacterCreateClassButton1")
    .UI.ButtonPos.setRelativePoint("TOP")
    .UI.ButtonPos.setPos(0, 44)
    .UI.Info.add("- Role: Tank, Healer, Damage")
    .UI.Info.add("- Medium Armor (Leather / Mail)")
    .UI.Info.add("- Combine melee abilities and ranged combat with Lunar and Nature magic.")
    .UI.Info.add("- Uses Lunar Power and Seeds of Nature as resources.")
    .UI.Description.set("Guardians of balance, Arch Druids channel the celestial forces of the moon and the life-giving energy of nature. "
        + "Whether shielding allies, healing wounds, or delivering devastating blows from afar, they embody balance and adaptability."
        + "This unique combination of skills makes Arch Druids a cornerstone of any adventuring party."
    )
    .CinematicSequence.set(0)
    .Tags.addUnique("tswow-module-public-tests.classes.archdruid", "class")
;



// Add runes as a resource.

for ( let i = 0; i < 32; i++ ) {
    std.SQL.class_has_runes.add(archdruid.ID, i);
}



std.EquipSkills.Cloth.enableAutolearnClass(archdruid.Mask);
std.EquipSkills.Leather.enableAutolearnClass(archdruid.Mask);
std.EquipSkills.Mail.enableAutolearnClass(archdruid.Mask);
std.EquipSkills.Axes1H.enableAutolearnClass(archdruid.Mask);
std.EquipSkills.FistWeapons.enableAutolearnClass(archdruid.Mask);
std.EquipSkills.Maces1H.enableAutolearnClass(archdruid.Mask);
std.EquipSkills.Polearms.enableAutolearnClass(archdruid.Mask);
std.EquipSkills.Staves.enableAutolearnClass(archdruid.Mask);
std.EquipSkills.Thrown.enableAutolearnClass(archdruid.Mask);