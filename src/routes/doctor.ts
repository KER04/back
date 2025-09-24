import { Application } from "express";
import { DoctorController } from "../controller/doctor.controller";

export class DoctorRoutes {
    public DoctorController: DoctorController = new DoctorController;

    public routes(app: Application): void{
        app.route("/api/doctor").get(this.DoctorController.getAllDoctor);
    }
}