import { PatientI, Patient } from "../models/patient";
import { Request, Response } from "express";

export class PatientController {
    // Obtener todos los pacientes activos
    public async getAllPatients(req: Request, res: Response) {
        try {
            const patients: PatientI[] = await Patient.findAll({
                where: { status: "ACTIVE" },
            });
            res.status(200).json({ patients });
        } catch (error) {
            console.error("Error al obtener pacientes:", error);
            res.status(500).json({ error: "Error al mostrar pacientes" });
        }

    }
}