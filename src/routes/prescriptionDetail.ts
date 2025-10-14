import { Application } from "express";
import { PrescriptionDetailController } from "../controller/prescriptionDetail.controller";
import { authMiddleware } from "../middleware/auth";

export class PrescriptionDetailRoutes {

    public prescriptionDetailController: PrescriptionDetailController = new PrescriptionDetailController;

    public routes(app: Application): void {
        app.route("/api/prescriptionDetail/public").get(this.prescriptionDetailController.getAllPrescriptionDetails);

        // Rutas que requieren autenticación
        app.route("/api/prescriptionDetail").get(authMiddleware, this.prescriptionDetailController.getAllPrescriptionDetails);
    }
}