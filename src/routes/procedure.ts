import { Application } from "express";
import { ProcedureController } from "../controller/procedure.controller";
import { authMiddleware } from "../middleware/auth";

export class ProcedureRoutes {
    public procedureController: ProcedureController = new ProcedureController();

    public routes(app: Application): void {
        app.route("/api/procedure/public").get(this.procedureController.getAllProcedures);
        app.route("/api/procedure/public/:id").get(this.procedureController.getProcedureById);
        app.route("/api/procedure/public").post(this.procedureController.createProcedure);
        app.route("/api/procedure/public/:id").put(this.procedureController.updateProcedure);
        app.route("/api/procedure/public/:id").delete(this.procedureController.deleteProcedure);

        // Rutas que requieren autenticación
        app.route("/api/procedure").get(authMiddleware, this.procedureController.getAllProcedures);
        app.route("/api/procedure/:id").get(authMiddleware, this.procedureController.getProcedureById);
        app.route("/api/procedure").post(authMiddleware, this.procedureController.createProcedure);
        app.route("/api/procedure/:id").put(authMiddleware, this.procedureController.updateProcedure);
        app.route("/api/procedure/:id").delete(authMiddleware, this.procedureController.deleteProcedure);
    }
}