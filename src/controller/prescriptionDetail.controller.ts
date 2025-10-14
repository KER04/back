import { Request, Response } from 'express';
import { PrescriptionDetailI, PrescriptionDetail } from '../models/prescriptiondetail';

export class PrescriptionDetailController {
    public async getAllPrescriptionDetails(req: Request, res: Response) {
        try {
            const prescriptionDetails: PrescriptionDetailI[] = await PrescriptionDetail.findAll(
                { where: { status: 'ACTIVE' } }
            );
            res.status(200).json(prescriptionDetails);
        } catch (error) {
            res.status(500).json({ error: 'Error al mostrar detalles de recetas' });
        }
    }
}

