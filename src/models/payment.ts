import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../database/db";
//pagos
export interface PaymentI {
  id?: number;
  appointment_id: number;
  total_amount: number;
  consultation_amount: number;
  procedures_amount: number;
  payment_method: "EFECTIVO" | "TARJETA" | "TRANSFERENCIA";
  payment_date: Date;
  payment_status: "PENDIENTE" | "COMPLETADO" |"FALLIDO";
  invoice_number?: string;
  status: "ACTIVE" | "INACTIVE";
}



export class Payment extends Model {
  
  public id!: number;
  public appointment_id!: number;
  public total_amount!: number;
  public consultation_amount!: number;
  public procedures_amount!: number;
  public payment_method!: "EFECTIVO" | "TARJETA" | "TRANSFERENCIA";
  public payment_date!: Date;
  public payment_status!: "PENDIENTE" | "COMPLETADO" |"FALLIDO";
  public invoice_number?: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Total amount must be greater than or equal to 0" },
        isDecimal: { msg: "Total amount must be a decimal number" }
      }
    },
    consultation_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Consultation amount must be greater than or equal to 0" },
        isDecimal: { msg: "Consultation amount must be a decimal number" }
      }
    },
    procedures_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        min: { args: [0], msg: "Procedures amount must be greater than or equal to 0" },
        isDecimal: { msg: "Procedures amount must be a decimal number" }
      }
    },
    payment_method: {
      type: DataTypes.ENUM("EFECTIVO", "TARJETA" , "TRANSFERENCIA"),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        //isDate: { msg: "Must be a valid date" }
      }
    },
    payment_status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "REFUNDED", "FAILED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    invoice_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
  }
);