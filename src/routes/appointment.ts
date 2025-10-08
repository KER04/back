import { Application } from "express";
import { AppointmentController } from "../controller/appointment.controller";

export class AppointmentRoutes {
    
    public AppointmentController: AppointmentController = new AppointmentController;

    public routes(app: Application): void{
        app.route("/api/appointment").get(this.AppointmentController.getAllAppointment);
        

    }
}