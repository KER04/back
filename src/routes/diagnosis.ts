import { Application } from "express";
import { DiagnosisController } from "../controller/diagnosis.controller";
import { authMiddleware } from "../middleware/auth";
export class DiagnosisRoutes {

    public diagnosisController: DiagnosisController = new DiagnosisController;

    public routes(app: Application): void {
        app.route("/api/diagnosis/public").get(this.diagnosisController.getAllDiagnosis);

        //rutas protegidas
        app.route("/api/diagnosis").get(authMiddleware, this.diagnosisController.getAllDiagnosis);
    }
}