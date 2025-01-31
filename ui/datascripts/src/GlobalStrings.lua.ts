import { std } from "wow/wotlk";



// Insert new lines here.

const newLines: string[] = [
    'ARCHDRUID_RUNIC_POWER = "Lunar Power";'            , // TODO: Doesn't work yet, currently just using RUNIC_POWER by replacing it.
    'COMBAT_TEXT_RUNE_NATURE = "Verdant Essence";'      ,
];



// Insert lines to be replaced here.

const replaceLines: string[][] = [
    //['COMBAT_TEXT_RUNE_DEATH = "Death Rune";'           , 'COMBAT_TEXT_RUNE_DEATH = "MODIFIED Death Rune";'],
    ['RUNIC_POWER = "Runic Power";'                     , 'RUNIC_POWER = "Lunar Power";'],
];



// Apply the changes.

const firstLine = 'ABANDON_PET';

newLines.unshift('-- tswow-module-custom-ui BEGIN --');
newLines.push('-- tswow-module-custom-ui END --');
newLines.push('');

newLines.forEach((value) => {
    std.LUAXML.file("Interface/FrameXML/GlobalStrings.lua").before(firstLine, value);
});

replaceLines.forEach(([key, value]) => {
    std.LUAXML.file("Interface/FrameXML/GlobalStrings.lua").replace(key, value);
});