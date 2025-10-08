import { DoctorRoutes } from "./doctor";
import { SpecialtyRoutes } from "./specialty";

export class Routes {
    public doctorRoutes: DoctorRoutes = new DoctorRoutes(); 
    public specialtyRoutes: SpecialtyRoutes = new SpecialtyRoutes();
}