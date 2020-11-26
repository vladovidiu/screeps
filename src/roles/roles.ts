export type Roles = {
  harvester: string;
  upgrader: string;
  builder: string;
};

export interface roleTemplates {
  [role: string]: BodyPartConstant[];
}

export const roles: roleTemplates = {
  harvester: [WORK, WORK, WORK, WORK, MOVE],
  upgrader: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
  builder: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]
};
