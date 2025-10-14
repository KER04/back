import { RoleUser } from "./RoleUser";
import { User } from "./user";
import { Role } from "./role";
import { Resource } from "./resource";
import { ResourceRole } from "./ResourceRole";
import { RefreshToken } from "./RefreshToken";

// Define associations

User.hasMany(RoleUser, {
    foreignKey: 'user_id',
    sourceKey: "id",
});
RoleUser.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: "id",
});

/*----------------------------*/ 
Role.hasMany(RoleUser, {
  foreignKey: 'role_id',
  sourceKey: "id",
});
RoleUser.belongsTo(Role, {
  foreignKey: 'role_id',
  targetKey: "id",
});

/*----------------------------*/
Resource.hasMany(ResourceRole, {
  foreignKey: "resource_id",
  sourceKey: "id",
});
ResourceRole.belongsTo(Resource, {
  foreignKey: "resource_id",
  targetKey: "id",
});

Role.hasMany(ResourceRole, {
  foreignKey: "role_id",
  sourceKey: "id",
});
ResourceRole.belongsTo(Role, {
  foreignKey: "role_id",
  targetKey: "id",
});

/*----------------------------- */
User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
  sourceKey: "id",
});
RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: "id",
});
/*----------------------------- */