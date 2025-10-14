import { Application } from "express";
import { DoctorController } from "../controller/doctor.controller";
import { authMiddleware } from "../middleware/auth";
export class DoctorRoutes {
    public DoctorController: DoctorController = new DoctorController;

    public routes(app: Application): void{
        app.route("/api/doctor/public").get(this.DoctorController.getAllDoctor);

        //rutas protegidas
        app.route("/api/doctor").get(authMiddleware, this.DoctorController.getAllDoctor);
    }
}