import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../database/db";
//detalle - receta
export interface PrescriptionDetailI {
  id?: number;
  prescription_id: number;
  medicine_id: number;
  quantity: number;
  dosage: string;
  treatment_days: number;
  special_instructions?: string;
  status: "ACTIVE | INACTIVE"
}


export class PrescriptionDetail extends Model{
  
  public id!: number;
  public quantity!: number;
  public dosage!: string;
  public treatment_days!: number;
  public special_instructions?: string;
  public status!: "ACTIVE | INACTIVE"
}

PrescriptionDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: "Quantity must be at least 1" },
        isInt: { msg: "Quantity must be an integer" }
      }
    },
    dosage: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Dosage cannot be empty" },
        len: { args: [3, 200], msg: "Dosage must be between 3 and 200 characters" }
      }
    },
    treatment_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: "Treatment days must be at least 1" },
        max: { args: [365], msg: "Treatment days cannot exceed 365" },
        isInt: { msg: "Treatment days must be an integer" }
      }
    },
    special_instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PrescriptionDetail",
    tableName: "prescription_details",
    timestamps: false,
  }
);