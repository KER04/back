import { DoctorRoutes } from "./doctor";
import { SpecialtyRoutes } from "./specialty";
import { AppointmentRoutes } from "./appointment";
import { PatientRoutes } from "./patient";
import { MedicineRoutes } from "./medicine";
import { PaymentRoutes } from "./payment";
import { PrescriptionRoutes } from "./prescription";
import { PrescriptionDetailRoutes } from "./prescriptionDetail";
import { ProcedureRoutes } from "./procedure";
import { DiagnosisRoutes } from "./diagnosis";

/*Autenticacion*/

import { UserRoutes } from "./authorization/user";
import { RoleRoutes } from "./authorization/role";
import { RoleUserRoutes } from "./authorization/role_user";
import { RefreshTokenRoutes } from "./authorization/refresh_token";
import { ResourceRoutes } from "./authorization/resource"; // Import ResourceRoutes
import { ResourceRoleRoutes } from "./authorization/resourceRole"; // Import ResourceRoleRoutes
import { AuthRoutes } from "./authorization/auth";

export class Routes {
    public doctorRoutes: DoctorRoutes = new DoctorRoutes();
    public specialtyRoutes: SpecialtyRoutes = new SpecialtyRoutes();
    public appointmentRoutes: AppointmentRoutes = new AppointmentRoutes();
    public patientRoutes: PatientRoutes = new PatientRoutes();
    public medicineRoutes: MedicineRoutes = new MedicineRoutes();
    public paymentRoutes: PaymentRoutes = new PaymentRoutes();
    public prescriptionRoutes: PrescriptionRoutes = new PrescriptionRoutes();
    public prescriptionDetailRoutes: PrescriptionDetailRoutes = new PrescriptionDetailRoutes();
    public procedureRoutes: ProcedureRoutes = new ProcedureRoutes();
    public diagnosisRoutes: DiagnosisRoutes = new DiagnosisRoutes();
    /*Autenticacion*/
    public userRoutes: UserRoutes = new UserRoutes();
    public roleRoutes: RoleRoutes = new RoleRoutes();
    public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
    public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
    public resourceRoutes: ResourceRoutes = new ResourceRoutes(); // Add ResourceRoutes
    public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes(); // Add ResourceRoutes
    public authRoutes: AuthRoutes = new AuthRoutes();
}