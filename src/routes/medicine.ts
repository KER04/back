import { Application } from "express";
import { MedicineController } from "../controller/medicine.controller";
import { authMiddleware } from "../middleware/auth";

export class MedicineRoutes {
    public medicineController: MedicineController = new MedicineController;

    public routes(app: Application): void {
        app.route("/api/medicine/public").get(this.medicineController.getAllMedicine);

        //rutas protegidas
        app.route("/api/medicine").get(authMiddleware, this.medicineController.getAllMedicine);
    }
}