import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface MedicineI {
  id?: number;
  commercial_name: string;
  generic_name: string;
  concentration: string;
  pharmaceutical_form: string;
  laboratory?: string;
  unit_price: number;
}

export class Medicine extends Model {

  public id!: number;
  public commercial_name!: string;
  public generic_name!: string;
  public concentration!: string;
  public pharmaceutical_form!: string;
  public laboratory?: string;
  public unit_price!: number;
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
        notEmpty: { msg: "Commercial name cannot be empty" },
        len: { args: [2, 100], msg: "Commercial name must be between 2 and 100 characters" }
      }
    },
    generic_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Generic name cannot be empty" },
        len: { args: [2, 100], msg: "Generic name must be between 2 and 100 characters" }
      }
    },
    concentration: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Concentration cannot be empty" }
      }
    },
    pharmaceutical_form: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Pharmaceutical form cannot be empty" }
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
        min: { args: [0], msg: "Price must be greater than 0" },
        isDecimal: { msg: "Price must be a decimal number" }
      }
    },
  },
  {
    sequelize,
    modelName: "Medicine",
    tableName: "medicines",
    timestamps: false,
  }
);