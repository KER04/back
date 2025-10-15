import { Model, DataTypes } from "sequelize";
import  sequelize  from "../../database/db";


export interface RoleUserI {
  id?: number;
  role_id: number;
  user_id: number;
  is_active?: "ACTIVE" | "INACTIVE";
}

export class RoleUser extends Model<RoleUserI> implements RoleUserI {
  public id!: number;
  public role_id!: number;
  public user_id!: number;
  public is_active!: "ACTIVE" | "INACTIVE";
}

RoleUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles", // nombre exacto de la tabla en tu BD
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // nombre exacto de la tabla en tu BD
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    is_active: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
      allowNull: false,
    },
  },
  {
    tableName: "role_users",
    sequelize,
    timestamps: false,
  }
);