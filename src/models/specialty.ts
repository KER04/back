import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../database/db";

export interface SpecialtyI {
  id?: number;
  specialty_name: string;
  description?: string;
}



export class Specialty extends Model {
  //el ! indica que no permite valores nulos
  public id!: number;
  public specialty_name!: string;
  public description!: string;
}

Specialty.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    specialty_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Specialty name cannot be empty" },
        len: { args: [3, 100], msg: "Specialty name must be between 3 and 100 characters" }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Specialty",
    tableName: "specialties",
    timestamps: false,
  }
);