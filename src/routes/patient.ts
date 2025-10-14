import { Application } from "express";
import { PatientController } from "../controller/patients.controller";
import { authMiddleware } from "../middleware/auth";
export class PatientRoutes {
    public patientController: PatientController = new PatientController;

    public routes(app: Application): void {
        app.route("/api/patient/public").get(this.patientController.getAllPatients);

        //rutas protegidas
        app.route("/api/patient").get(authMiddleware, this.patientController.getAllPatients);
    }
}