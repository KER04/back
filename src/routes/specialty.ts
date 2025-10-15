import { Application } from "express";
import { SpecialtyController } from "../controller/specialty.controller";
import { authMiddleware } from "../middleware/auth";

export class SpecialtyRoutes {
    
    public SpecialtyController: SpecialtyController = new SpecialtyController;

    public routes(app: Application): void{
        app.route("/api/specialty/public").get(this.SpecialtyController.getAllSpecialties);
        app.route("/api/specialty/public/:id").get(this.SpecialtyController.getSpecialtyById);
        app.route("/api/specialty/public").post(this.SpecialtyController.createSpecialty);
        app.route("/api/specialty/public/:id").put(this.SpecialtyController.updateSpecialty);
        app.route("/api/specialty/public/:id").delete(this.SpecialtyController.deleteSpecialty);

        //rutas con autenticación
        app.route("/api/specialty").get(authMiddleware, this.SpecialtyController.getAllSpecialties);
        app.route("/api/specialty/:id").get(authMiddleware, this.SpecialtyController.getSpecialtyById);
        app.route("/api/specialty").post(authMiddleware, this.SpecialtyController.createSpecialty);
        app.route("/api/specialty/:id").put(authMiddleware, this.SpecialtyController.updateSpecialty);
        app.route("/api/specialty/:id").delete(authMiddleware, this.SpecialtyController.deleteSpecialty);
    
    }}