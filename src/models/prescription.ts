import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../database/db";

//receta
export interface PrescriptionI {
  id?: number;
  appointment_id: number;
  doctor_id: number;
  issue_date: Date;
  general_instructions?: string;
  status: "ACTIVE" | "iNACTIVE";
}



export class Prescription extends Model {
  
  public id!: number;
  public doctor_id!: number;
  public issue_date!: Date;
  public general_instructions?: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Prescription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        //isDate: { msg: "Must be a valid date" }
      }
    },
    general_instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Prescription",
    tableName: "prescriptions",
    timestamps: false,
  }
);