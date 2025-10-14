import { Application } from "express";
import {PaymentController} from "../controller/payment.controller";
import { authMiddleware } from "../middleware/auth";

export class PaymentRoutes{
    public paymentController: PaymentController = new PaymentController;

    public routes(app: Application): void{
        app.route("/api/payment/public").get(this.paymentController.getAllPayment);

        //rutas protegidas
        app.route("/api/payment").get(authMiddleware, this.paymentController.getAllPayment);
    }
}