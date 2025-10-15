import { DataTypes, Model } from "sequelize";
import  sequelize  from "../../database/db"; // ajusta la ruta según tu estructura

export class ResourceRole extends Model {
  public id!: number;
  public resource_id!: number;
  public role_id!: number;
  public is_active!: "ACTIVE" | "INACTIVE";
}

export interface ResourceRoleI {
  id?: number;
  resource_id: number;
  role_id: number;
  is_active: "ACTIVE" | "INACTIVE";
}

ResourceRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "resources",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    is_active: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    tableName: "resource_roles",
    timestamps: false,
  }
);
