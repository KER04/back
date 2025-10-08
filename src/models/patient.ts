import { DataTypes, Model } from "sequelize";
import  sequelize  from "../database/db";

//pacientes
export interface PatientI {
  id?: number;
  first_name: string;
  last_name: string;
  document: string;
  birth_date: Date;
  phone?: string;
  email?: string;
  address?: string;
  gender: "M" | "F";
  status: "ACTIVE" | "INACTIVE";
}

export class Patient extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public document!: string;
  public birth_date!: Date;
  public phone!: string;
  public email!: string;
  public address!: string;
  public gender!: "M" | "F";
  public status!: "ACTIVE" | "INACTIVE";
}

Patient.init(
  {
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    document_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("MASCULINO", "FEMENINO"),
      
    },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "patients",
    timestamps: false,
  }
);