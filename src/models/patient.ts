import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface PatientI {
  id?: number;
  first_name: string;
  last_name: string;
  document_id: string;
  birth_date: Date;
  phone?: string;
  email?: string;
  address?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

export class Patient extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public document_id!: string;
  public birth_date!: Date;
  public phone!: string;
  public email!: string;
  public address!: string;
  public gender!: "MALE" | "FEMALE" | "OTHER";
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
      type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
      defaultValue: "OTHER",
    },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "patients",
    timestamps: false,
  }
);