import { PaymentI, Payment } from "../models/payment";
import { Request, Response } from "express";

export class PaymentController{
    public async getAllPayment(req: Request, res: Response){
        try{
            const payment: PaymentI[] = await Payment.findAll(
                { where: { status: "ACTIVE" } }
            );
            res.status(200).json(payment);
        }   catch(error){
            res.status(500).json({ error: 'Error al mostrar pagos' });
        }
    }
}