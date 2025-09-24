import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/db";

export interface AppointmentI {
  id?: number;
  patient_id: number;
  doctor_id: number;
  appointment_datetime: Date;
  consultation_reason?: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  observations?: string;
}



export class Appointment extends Model {
  
  public id!: number;
  public patient_id!: number;
  public doctor_id!: number;
  public appointment_datetime!: Date;
  public consultation_reason?: string;
  public status!: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  public observations?: string;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'id'
      }
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctors',
        key: 'id'
      }
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
      type: DataTypes.ENUM("SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"),
      allowNull: false,
      defaultValue: "SCHEDULED",
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