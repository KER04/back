import { PrescriptionController } from "../controller/prescription.controller";
import { Application } from "express";
import { authMiddleware } from "../middleware/auth";

export class PrescriptionRoutes {
    public prescriptionController: PrescriptionController = new PrescriptionController;

    public routes(app: Application): void {
        app.route("/api/prescriptions/public").get(this.prescriptionController.getAllPrescriptions);

        // Rutas que requieren autenticación
        app.route("/api/prescriptions").get(authMiddleware, this.prescriptionController.getAllPrescriptions);
    }
}