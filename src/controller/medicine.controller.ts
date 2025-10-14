import { MedicineI, Medicine } from "../models/medicine";
import { Request, Response } from "express";

export class MedicineController {
    public async getAllMedicine(req: Request, res: Response) {
        try {
            const medicine: MedicineI[] = await Medicine.findAll(
                { where: { status: "ACTIVE" } }
            );
            res.status(200).json(medicine);
        } catch (error) {
            res.status(500).json({ error: 'Error al mostrar medicamentos' });
        }
    }
}