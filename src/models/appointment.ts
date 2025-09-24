import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../database/db";

export interface AppointmentI {
  id?: number;
  patient_id: number;
  doctor_id: number;
  appointment_datetime: Date;
  consultation_reason?: string;
  status: "ACTIVE" | "INACTIVE";
  observations?: string;
}



export class Appointment extends Model {
  
  public id!: number;
  public patient_id!: number;
  public doctor_id!: number;
  public appointment_datetime!: Date;
  public consultation_reason?: string;
  public status!: "ACTIVE" | "INACTIVE";;
  public observations?: string;
}
//En EL INIT no se ponen las relaciones
Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    appointment_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        //isDate: { msg: "Must be a valid date and time" }
      }
    },
    consultation_reason: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
    timestamps: false,
  }
);