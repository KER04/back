import { Application } from "express";
import { SpecialtyController } from "../controller/specialty.controller";

export class SpecialtyRoutes {
    
    public SpecialtyController: SpecialtyController = new SpecialtyController;

    public routes(app: Application): void{
        app.route("/api/specialty").get(this.SpecialtyController.getAllSpecialties);
        app.route("/api/specialty/:id").get(this.SpecialtyController.getSpecialtyById);
        app.route("/api/specialty").post(this.SpecialtyController.createSpecialty);
        app.route("/api/specialty/:id").put(this.SpecialtyController.updateSpecialty);
        app.route("/api/specialty/:id").delete(this.SpecialtyController.deleteSpecialty);
    
    }}