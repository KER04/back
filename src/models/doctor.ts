import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";
import { Specialty } from "./specialty";

export interface DoctorI {
  id?: number;
  first_name: string;
  last_name: string;
  document: string;
  phone?: string;
  email?: string;
  medical_license: string;
  specialty_id: number;
  status: "ACTIVE | INACTIVE"
}



export class Doctor extends Model {

  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public document!: string;
  public phone?: string;
  public email?: string;
  public medical_license!: string;
  public specialty_id!: number;
  public status!: "ACTIVE | INACTIVE"
}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "First name cannot be empty" },
        len: { args: [2, 100], msg: "First name must be between 2 and 100 characters" }
      }
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Last name cannot be empty" },
        len: { args: [2, 100], msg: "Last name must be between 2 and 100 characters" }
      }
    },
    document_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Document ID cannot be empty" }
      }
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        len: { args: [7, 15], msg: "Phone must be between 7 and 15 digits" }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: { msg: "Must be a valid email" }
      }
    },
    medical_license: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Medical license cannot be empty" }
      }
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Doctor",
    tableName: "doctors",
    timestamps: false,
  }
);
//relaciones 
Doctor.hasMany(Specialty, {
  foreignKey: "doctor_id",
  sourceKey: "id"
})
Specialty.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  targetKey: "id"
})