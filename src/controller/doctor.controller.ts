import { Doctor, DoctorI } from "../models/doctor";
import { Request, Response } from "express";


//mostrar que tengan estado activo 
export class DoctorController {
    public async getAllDoctor(req: Request, res: Response) {
        try {

            const doctor: DoctorI[] = await Doctor.findAll({
                where: { status: "ACTIVE" },
            });
            res.status(200).json({ doctor });

        } catch (error) {
            res.status(200).json({ error: "error al mostrar doctores" });
        }
    }
}