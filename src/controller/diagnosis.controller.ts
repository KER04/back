import { DiagnosisI, Diagnosis } from "../models/diagnosis";
import { Request, Response } from "express";

export class DiagnosisController {
    public async getAllDiagnosis(req: Request, res: Response) {
        try {
            const diagnosis: DiagnosisI[] = await Diagnosis.findAll({
                where: { status: "ACTIVE" },
            });
            res.status(200).json({ diagnosis });
        } catch (error) {
            res.status(200).json({ error: "error al mostrar diagnosticos" });
        }
    }

}