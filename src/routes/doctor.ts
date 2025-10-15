import { Application } from "express";
import { DoctorController } from "../controller/doctor.controller";
import { authMiddleware } from "../middleware/auth";
export class DoctorRoutes {
    public DoctorController: DoctorController = new DoctorController;

    public routes(app: Application): void {
        app.route("/api/doctor/public").get(this.DoctorController.getAllDoctor);
        app.route("/api/doctor/public/:id").get(this.DoctorController.getDoctorById);
        app.route("/api/doctor/public").post(this.DoctorController.createDoctor);
        app.route("/api/doctor/public/:id").put(this.DoctorController.updateDoctor);
        app.route("/api/doctor/public/:id").delete(this.DoctorController.deleteDoctor);

        //rutas protegidas
        app.route("/api/doctor").get(authMiddleware, this.DoctorController.getAllDoctor);
        app.route("/api/doctor/:id").get(authMiddleware, this.DoctorController.getDoctorById);
        app.route("/api/doctor").post(authMiddleware, this.DoctorController.createDoctor);
        app.route("/api/doctor/:id").put(authMiddleware, this.DoctorController.updateDoctor);
        app.route("/api/doctor/:id").delete(authMiddleware, this.DoctorController.deleteDoctor);
    }
}