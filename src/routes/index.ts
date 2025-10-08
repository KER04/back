import { DoctorRoutes } from "./doctor";
import { SpecialtyRoutes } from "./specialty";
import { AppointmentRoutes } from "./appointment";

export class Routes {
    public doctorRoutes: DoctorRoutes = new DoctorRoutes(); 
    public specialtyRoutes: SpecialtyRoutes = new SpecialtyRoutes();
    public appointmentRoutes: AppointmentRoutes = new AppointmentRoutes();
}