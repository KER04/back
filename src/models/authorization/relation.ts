import { RoleUser } from "./RoleUser";
import { User } from "./user";
import { Role } from "./role";
import { Resource } from "./resource";
import { ResourceRole } from "./ResourceRole";
import { RefreshToken } from "./RefreshToken";

/* ============================================================
   🔹 RELACIONES ENTRE USUARIO Y ROL (MANY TO MANY)
   ============================================================ */

User.belongsToMany(Role, {
  through: RoleUser,
  foreignKey: "user_id",
  otherKey: "role_id",
});

Role.belongsToMany(User, {
  through: RoleUser,
  foreignKey: "role_id",
  otherKey: "user_id",
});

/* ============================================================
   🔹 RELACIONES ENTRE ROL Y RECURSO (MANY TO MANY)
   ============================================================ */

Role.belongsToMany(Resource, {
  through: ResourceRole,
  foreignKey: "role_id",
  otherKey: "resource_id",
});

Resource.belongsToMany(Role, {
  through: ResourceRole,
  foreignKey: "resource_id",
  otherKey: "role_id",
});

/* ============================================================
   🔹 RELACIONES 1 A MUCHOS (EXPLÍCITAS PARA FACILITAR QUERIES)
   ============================================================ */

// User ↔ RoleUser
User.hasMany(RoleUser, { foreignKey: "user_id", sourceKey: "id" });
RoleUser.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

// Role ↔ RoleUser
Role.hasMany(RoleUser, { foreignKey: "role_id", sourceKey: "id" });
RoleUser.belongsTo(Role, { foreignKey: "role_id", targetKey: "id" });

// Resource ↔ ResourceRole
Resource.hasMany(ResourceRole, { foreignKey: "resource_id", sourceKey: "id" });
ResourceRole.belongsTo(Resource, { foreignKey: "resource_id", targetKey: "id" });

// Role ↔ ResourceRole
Role.hasMany(ResourceRole, { foreignKey: "role_id", sourceKey: "id" });
ResourceRole.belongsTo(Role, { foreignKey: "role_id", targetKey: "id" });

// User ↔ RefreshToken
User.hasMany(RefreshToken, { foreignKey: "user_id", sourceKey: "id" });
RefreshToken.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

/* ============================================================
   ✅ EXPORTAR TODO PARA USO GLOBAL
   ============================================================ */
export {
  User,
  Role,
  RoleUser,
  Resource,
  ResourceRole,
  RefreshToken,
};