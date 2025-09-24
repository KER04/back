import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/db";

export interface PaymentI {
  id?: number;
  appointment_id: number;
  total_amount: number;
  consultation_amount: number;
  procedures_amount: number;
  payment_method: "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "TRANSFER" | "INSURANCE";
  payment_date: Date;
  payment_status: "PENDING" | "COMPLETED" | "REFUNDED" | "FAILED";
  invoice_number?: string;
}

interface PaymentCreationAttributes extends Optional<PaymentI, "id"> {}

export class Payment extends Model<PaymentI, PaymentCreationAttributes> 
  implements PaymentI {
  
  public id!: number;
  public appointment_id!: number;
  public total_amount!: number;
  public consultation_amount!: number;
  public procedures_amount!: number;
  public payment_method!: "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "TRANSFER" | "INSURANCE";
  public payment_date!: Date;
  public payment_status!: "PENDING" | "COMPLETED" | "REFUNDED" | "FAILED";
  public invoice_number?: string;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Relación 1:1 con Appointment
      references: {
        model: 'appointments',
        key: 'id'
      }
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
      type: DataTypes.ENUM("CASH", "CREDIT_CARD", "DEBIT_CARD", "TRANSFER", "INSURANCE"),
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