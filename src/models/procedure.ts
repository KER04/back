import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../database/db";

export interface ProcedureI {
  id?: number;
  appointment_id: number;
  procedure_code?: string;
  procedure_name: string;
  description?: string;
  cost: number;
  performed_date: Date;
}



export class Procedure extends Model {
  
  public id!: number;
  public procedure_code?: string;
  public procedure_name!: string;
  public description?: string;
  public cost!: number;
  public performed_date!: Date;
}

Procedure.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'appointments',
        key: 'id'
      }
    },
    procedure_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    procedure_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Procedure name cannot be empty" },
        len: { args: [3, 200], msg: "Procedure name must be between 3 and 200 characters" }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Cost must be greater than or equal to 0" },
        isDecimal: { msg: "Cost must be a decimal number" }
      }
    },
    performed_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        //isDate: { msg: "Must be a valid date" }
      }
    },
  },
  {
    sequelize,
    modelName: "Procedure",
    tableName: "procedures",
    timestamps: false,
  }
);