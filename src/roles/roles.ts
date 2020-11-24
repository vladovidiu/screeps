export type Roles = {
  harvester: string;
  upgrader: string;
  builder: string;
};

export interface roleTemplates {
  [role: string]: BodyPartConstant[];
}

export const roles: roleTemplates = {
  harvester: [WORK, WORK, MOVE],
  upgrader: [WORK, CARRY, MOVE],
  builder: [WORK, CARRY, MOVE]
};
