import { Request, Response } from 'express';
import { ProcedureI, Procedure } from '../models/procedure';

export class ProcedureController {
    public async getAllProcedures(req: Request, res: Response) {
        try {
            const procedures: ProcedureI[] = await Procedure.findAll(
                { where: { status: "ACTIVE" } }
            );
            res.status(200).json(procedures);
        } catch (error) {
            res.status(500).json({ error: 'Error al mostrar procedimientos' });
        }
    }
}