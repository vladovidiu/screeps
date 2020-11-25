import { ErrorMapper } from "utils/ErrorMapper";

import * as constants from "./constants";

import * as harvester from "./roles/harvester";
import * as upgrader from "./roles/upgrader";
import * as builder from "./roles/builder";

import { respawn } from "creeps/respawn";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  const spawn = Game.spawns[constants.coreSpawn];

  respawn(spawn, "harvester", 3);
  respawn(spawn, "upgrader", 6);
  respawn(spawn, "builder", 1);

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
      case "harvester":
        harvester.run(creep);
        break;
      case "upgrader":
        upgrader.run(creep);
        break;
      case "builder":
        builder.run(creep);
        break;
      default:
        break;
    }
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
