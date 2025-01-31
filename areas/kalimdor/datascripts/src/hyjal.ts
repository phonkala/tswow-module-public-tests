import { std } from "wow/wotlk";


// Remove No Man's Land aura from Hyjal.

std.SQL.spell_area.query({ area: 616, spell: 42202 }).delete();



// Add training dummies.

std.CreatureTemplates.load(32666)
    .Spawns.add("tswow-module-public-tests.areas.kalimdor", "creature.hyjal.expert-training-dummy.spawn-1", { map: 1, x: 5405.015, y: -2732.7163, z: 1454.5052, o: 0.18 })
    .Spawns.add("tswow-module-public-tests.areas.kalimdor", "creature.hyjal.expert-training-dummy.spawn-2", { map: 1, x: 5400.058, y: -2723.7937, z: 1453.766, o: 6.2 })
    .Spawns.add("tswow-module-public-tests.areas.kalimdor", "creature.hyjal.expert-training-dummy.spawn-3", { map: 1, x: 5403.534, y: -2714.9622, z: 1452.7249, o: 5.6 })
    .Spawns.add("tswow-module-public-tests.areas.kalimdor", "creature.hyjal.expert-training-dummy.spawn-4", { map: 1, x: 5410.452, y: -2707.6025, z: 1451.9517, o: 5 })
;



// Add druid class trainer.

std.CreatureTemplates.load(26324).Spawns.add("tswow-module-public-tests.areas.kalimdor", "creature.hyjal.druid-class-trainer.spawn-1", { map: 1, x: 5436.272, y: -2692.5676, z: 1456.7301, o: 4.2 });




// Allow flying.
// TODO: Need to apply it only to specific areaIDs, current solution enables it anywhere for specific spells.

std.Spells.load(40120).Attributes.OUTLAND_USE_ONLY.set(false);