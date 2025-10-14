import { Application } from "express";
import { ProcedureController } from "../controller/procedure.controller";
import { authMiddleware } from "../middleware/auth";

export class ProcedureRoutes {
    public procedureController: ProcedureController = new ProcedureController();

    public routes(app: Application): void {
        app.route("/api/procedure/public").get(this.procedureController.getAllProcedures);

        // Rutas que requieren autenticación
        app.route("/api/procedure").get(authMiddleware, this.procedureController.getAllProcedures);
    }
}