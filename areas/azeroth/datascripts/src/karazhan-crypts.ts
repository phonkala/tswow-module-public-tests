import { std } from "wow/wotlk";



// Add teleports to get in and out (past the invisible wall).

std.AreaTriggers
    .createRadius("tswow-module-public-tests.areas.azeroth", "karazhan-crypts.tp-in", { map: 0, x: -11068.432, y: -1828.5123, z: 60.259453, o: 0.05 }, 5)
    .Teleport.Position.set({ map: 0, x: -11069.709, y: -1795.7505, z: 53.732082, o: 3.185 })
;

std.AreaTriggers
    .createRadius("tswow-module-public-tests.areas.azeroth", "karazhan-crypts.tp-out", { map: 0, x: -11068.255, y: -1819.9731, z: 57.488503, o: 4.75 }, 5)
    .Teleport.Position.set({ map: 0, x: -11088.315, y: -1829.2461, z: 70.08496, o: 3.185 })
;