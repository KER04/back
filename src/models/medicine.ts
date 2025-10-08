import { DataTypes, Model } from "sequelize";
import  sequelize  from "../database/db";

//medicamentos
export interface MedicineI {
  id?: number;
  commercial_name: string;
  generic_name: string;
  concentration: string;
  pharmaceutical_form: string;
  laboratory?: string;
  unit_price: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Medicine extends Model {

  public id!: number;
  public commercial_name!: string;
  public generic_name!: string;
  public concentration!: string;
  public pharmaceutical_form!: string;
  public laboratory?: string;
  public unit_price!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Medicine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    commercial_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre comercial no puede estar vacío" },
        len: { args: [2, 100], msg: "El nombre comercial debe tener entre 2 y 100 caracteres" }
      }
    },
    generic_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre genérico no puede estar vacío" },
        len: { args: [2, 100], msg: "El nombre genérico debe tener entre 2 y 100 caracteres" }
      }
    },
    concentration: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La concentración no puede estar vacía" }
      }
    },
    pharmaceutical_form: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La forma farmacéutica no puede estar vacía" }
      }
    },
    laboratory: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: { args: [0], msg: "El precio debe ser mayor que 0" },
        isDecimal: { msg: "El precio debe ser un número decimal" }
      }
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    }
  },
  {
    sequelize,
    modelName: "Medicine",
    tableName: "medicines",
    timestamps: false,
  }
);