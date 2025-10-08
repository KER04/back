import { AppointmentI, Appointment } from "../models/appointment";
import { Request, Response } from "express";

//mostrar que tengan estado activo 
export class AppointmentController {
    public async getAllAppointment(req: Request, res: Response) {
        try {

            const appointment: AppointmentI[] = await Appointment.findAll({
                where: { status: "ACTIVE" },
            });
            res.status(200).json({ appointment });

        } catch (error) {
            res.status(200).json({ error: "error al mostrar citas" });
        }
    }
}