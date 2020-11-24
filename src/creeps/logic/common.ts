import * as constants from "../../constants";

export const harvest_logic = (creep: Creep) => {
  const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  if (source) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: constants.colors.lime } });
    }
  }
};

export const energy_deposit_logic = (creep: Creep): boolean => {
  const targets = creep.room.find(FIND_MY_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType === STRUCTURE_EXTENSION ||
          structure.structureType === STRUCTURE_SPAWN ||
          structure.structureType === STRUCTURE_TOWER) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      );
    }
  });

  if (targets.length > 0) {
    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: constants.colors.pink } });
    }

    return true;
  }

  return false;
};

export const pickup_resources_logic = (creep: Creep) => {
  const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
  if (!target) {
    return;
  }

  if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, { visualizePathStyle: { stroke: constants.colors.light_purple } });
  }
};

export const upgrade_controller_logic = (creep: Creep) => {
  const { controller } = creep.room;
  if (controller) {
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(controller, { visualizePathStyle: { stroke: constants.colors.purple } });
    }
  }
};

export const build_logic = (creep: Creep) => {
  const targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);

  if (targets.length) {
    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: constants.colors.purple } });
    }

    return true;
  }

  return false;
};

export const repair_logic = (creep: Creep) => {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure: Structure<StructureConstant>) => {
      // NOTE: probably makes sense to have percentage based repair margin
      return structure.hitsMax - structure.hits > constants.REPAIR_MARGIN;
    }
  });
  if (targets.length) {
    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }
};
