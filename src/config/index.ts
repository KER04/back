import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import sequelize from "../database/db";
import { Routes } from "../routes/index";
var cors = require("cors"); // install en node y types

// Load environment variables from the .env file
dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();

    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection(); // Call the database connection method
  }

  // Application settings
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

  // Middleware configuration
  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  // Route configuration
  private routes(): void {
    this.routePrv.doctorRoutes.routes(this.app); // de las rutas se llama el public 
    this.routePrv.specialtyRoutes.routes(this.app);
    this.routePrv.appointmentRoutes.routes(this.app);
    this.routePrv.patientRoutes.routes(this.app);
    this.routePrv.diagnosisRoutes.routes(this.app);
    this.routePrv.medicineRoutes.routes(this.app);
    this.routePrv.paymentRoutes.routes(this.app);
    this.routePrv.prescriptionRoutes.routes(this.app);
    this.routePrv.prescriptionDetailRoutes.routes(this.app);
    this.routePrv.procedureRoutes.routes(this.app);
    /*Autenticacion*/
    this.routePrv.userRoutes.routes(this.app);
    this.routePrv.roleRoutes.routes(this.app);
    this.routePrv.roleUserRoutes.routes(this.app);
    this.routePrv.refreshTokenRoutes.routes(this.app);
    this.routePrv.resourceRoutes.routes(this.app);
    this.routePrv.authRoutes.routes(this.app);
    this.routePrv.resourceRoleRoutes.routes(this.app);

  }

  // Method to connect and synchronize the database
  private async dbConnection(): Promise<void> {
    try {
      // force: false para que no se eliminen los registros
      await sequelize.sync({ force: false   }); // Synchronize the database
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  // Start the server xd
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}