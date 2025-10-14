import { Application } from "express";
import { AppointmentController } from "../controller/appointment.controller";
import { authMiddleware } from "../middleware/auth";

export class AppointmentRoutes {
    
    public AppointmentController: AppointmentController = new AppointmentController;

    public routes(app: Application): void{
        app.route("/api/appointment/public").get(this.AppointmentController.getAllAppointment);
        
        //Rutas protegidas
        app.route("/api/appointment").get(authMiddleware, this.AppointmentController.getAllAppointment);
        
    }
}