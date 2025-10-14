import { PrescriptionI, Prescription } from "../models/prescription";
import { Request, Response } from "express";

export class PrescriptionController {
    public async getAllPrescriptions(req: Request, res: Response) {
        try {
            const prescriptions: PrescriptionI[] = await Prescription.findAll(
                { where: { status: "ACTIVE" } }
            );
            res.status(200).json(prescriptions);
        } catch (error) {
            res.status(500).json({ error: 'Error al mostrar recetas' });
        }
    }
}