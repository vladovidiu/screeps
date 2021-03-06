import * as common from "../creeps/logic/common";

export const run = (creep: Creep) => {
  if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.working = false;
  }

  if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    if (!common.build_logic(creep)) {
      common.repair_logic(creep);
    }
  } else {
    common.pickup_resources_logic(creep);
  }
};
