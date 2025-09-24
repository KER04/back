import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/db";

export interface DiagnosisI {
  id?: number;
  patient_id: number;
  appointment_id: number;
  icd10_code?: string;
  description: string;
  diagnosis_date: Date;
  observations?: string;
}

interface DiagnosisCreationAttributes extends Optional<DiagnosisI, "id"> {}

export class Diagnosis extends Model<DiagnosisI, DiagnosisCreationAttributes> 
  implements DiagnosisI {
  
  public id!: number;
  public patient_id!: number;
  public appointment_id!: number;
  public icd10_code?: string;
  public description!: string;
  public diagnosis_date!: Date;
  public observations?: string;
}

Diagnosis.init(
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
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'appointments',
        key: 'id'
      }
    },
    icd10_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        len: { args: [3, 10], msg: "ICD-10 code must be between 3 and 10 characters" }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description cannot be empty" }
      }
    },
    diagnosis_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        //isDate: { msg: "Must be a valid date" }
      }
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Diagnosis",
    tableName: "diagnoses",
    timestamps: false,
  }
);