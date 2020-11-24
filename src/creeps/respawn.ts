import { roles } from "../roles/roles";

export const respawn = (spawn: StructureSpawn, role: string, count: number) => {
  if (spawn.spawning) {
    return;
  }

  const roleCreep = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === role);
  console.log(`Found ${roleCreep.length} creeps with role ${role}`);

  if (roleCreep.length < count) {
    const name = `Creep_${role}_${Game.time}`;
    switch (spawn.spawnCreep(roles[role], name, { memory: { role, room: spawn.room.name, working: true } })) {
      case OK:
        console.log(`Spawning new creep with role ${role} named ${name}`);
        break;
      default:
        break;
    }
  }
};
