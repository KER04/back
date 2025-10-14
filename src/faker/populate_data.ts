import { faker } from '@faker-js/faker';
import { Doctor } from "../models";
import { Specialty } from "../models";
import { Patient } from '../models';
import { Appointment } from '../models/appointment';
import { Diagnosis } from '../models/diagnosis';
import { Procedure } from '../models/procedure';
import { Medicine } from '../models/medicine';
import { Prescription } from '../models/prescription';
import { PrescriptionDetail } from '../models/prescriptiondetail';
import { Payment } from '../models/payment';


//Llamado de funciones para poblar la base de datos con datos falsos, en orden

//Especialidades primero
//createFakeSpecialties().catch((error) => console.error('❌ Error al crear especialidades falsas:', error));

//Luego doctores
//createFakeData().then(() => console.log('✅ Datos falsos de doctores creados correctamente')).catch((error) => console.error('❌ Error al crear doctores falsos:', error));

//Luego pacientes 
//createPatients().then(() => console.log('✅ Datos falsos de pacientes creados correctamente')).catch((error) => console.error('❌ Error al crear datos falsos de pacientes:', error));

//Luego citas médicas
//createAppointments().catch((error) => console.error('❌ Error al crear citas médicas falsas:', error));

//crear diagnósticos
//createDiagnoses().catch((error) => console.error('❌ Error al crear diagnósticos falsos:', error));

//Luego procedimientos
//createProcedures().catch((error) => console.error('❌ Error al crear procedimientos falsos:', error));

//Luego medicamentos
//createMedicines().catch((error) => console.error('❌ Error al crear medicamentos falsos:', error));

//Luego recetas médicas
//createPrescriptions().catch((error) => console.error('❌ Error al crear recetas médicas falsas:', error));

//Luego detalles de recetas médicas
//createPrescriptionDetails().catch((error) => console.error('❌ Error al crear detalles de recetas médicas falsas:', error));

//Finalmente pagos
//createPayments().catch((error) => console.error('❌ Error al crear pagos falsos:', error));



// Función para crear datos falsos de doctores
async function createFakeData() {
  for (let i = 0; i < 50; i++) {
    await Doctor.create({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      document: faker.string.numeric(10), // documento tipo cédula o similar
      phone: faker.string.numeric(faker.number.int({ min: 7, max: 15 })), // teléfono entre 7 y 15 dígitos
      email: faker.internet.email(),
      medical_license: faker.string.alphanumeric(8).toUpperCase(), // licencia médica
      specialty_id: faker.number.int({ min: 1, max: 10 }), // asumiendo 10 especialidades
      status: 'ACTIVE',
    });
  }
}


// Función para crear datos falsos de especialidades
async function createFakeSpecialties() {
  const specialties = [
    'Cardiología',
    'Dermatología',
    'Neurología',
    'Pediatría',
    'Oftalmología',
    'Ginecología',
    'Ortopedia',
    'Psiquiatría',
    'Urología',
    'Oncología',
  ];

  for (let name of specialties) {
    await Specialty.create({
      specialty_name: name,
      description: faker.lorem.sentence(), // descripción breve aleatoria
      status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']), // aleatorio entre ambos estados
    });
  }

  console.log('✅ Especialidades falsas creadas correctamente');
}

//funcion para crear datos falsos de pacientes
async function createPatients() {
  for (let i = 0; i < 50; i++) {

    await Patient.create({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      document: faker.string.numeric(10), // documento tipo cédula o similar
      birth_date: faker.date.past({ years: 80, refDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)) }), // fecha de nacimiento entre hace 18 y 80 años
      phone: faker.string.numeric(faker.number.int({ min: 7, max: 15 })), // teléfono entre 7 y 15 dígitos
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      gender: faker.helpers.arrayElement(['M', 'F']),
      status: 'ACTIVE',
    });

  }

}

async function createAppointments() {
  // Implementar la creación de citas médicas falsas
  // Asegurarse de que los IDs de doctor y paciente existan en la base de datos
  for (let i = 0; i < 100; i++) {
    const doctorId = faker.number.int({ min: 1, max: 50 });
    const patientId = faker.number.int({ min: 1, max: 50 });
    await Appointment.create({

      doctor_id: doctorId,
      patient_id: patientId,
      appointment_datetime: faker.date.soon({ days: 60 }), // próxima cita dentro de 60 días
      consultation_reason: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
      observations: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.4 }),

    });
  }
  console.log('✅ Citas médicas falsas creadas correctamente');
}

async function createDiagnoses() {
  // Implementar la creación de diagnósticos falsos
  // Asegurarse de que los IDs de cita médica existan en la base de datos
  for (let i = 0; i < 50; i++) {
    const appointments = await Appointment.findAll({ attributes: ["id", "patient_id"] });
    const patients = await Patient.findAll({ attributes: ["id"] });

    if (appointments.length === 0 || patients.length === 0) {
      console.warn("⚠️ No hay citas o pacientes para generar diagnósticos.");
      return;
    }
    const randomAppointment = faker.helpers.arrayElement(appointments);
    await Diagnosis.create({
      appointment_id: randomAppointment.id,
      patient_id: randomAppointment.patient_id, // Asociado al paciente de la cita
      description: faker.lorem.sentences({ min: 1, max: 3 }),
      diagnosis_date: faker.date.recent({ days: 30 }),
      observations: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.5 }),
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    });
  }
  console.log('✅ Diagnósticos falsos creados correctamente');
}

async function createProcedures() {
  // Obtener citas existentes para asociar los procedimientos
  const appointments = await Appointment.findAll({ attributes: ["id"] });

  if (appointments.length === 0) {
    console.warn("⚠️ No hay citas médicas para generar procedimientos.");
    return;
  }

  for (let i = 0; i < 20; i++) {
    // Selecciona una cita aleatoria
    const randomAppointment = faker.helpers.arrayElement(appointments);

    await Procedure.create({
      appointment_id: randomAppointment.id, // ✅ relación correcta
      procedure_code: faker.string.alphanumeric(6).toUpperCase(), // código aleatorio tipo "AB12CD"
      procedure_name: faker.lorem.words({ min: 2, max: 4 }),
      description: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.7 }),
      cost: parseFloat(faker.commerce.price({ min: 50, max: 5000, dec: 2 })),
      performed_date: faker.date.recent({ days: 60 }), // fecha reciente
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    });
  }

  console.log("✅ Procedimientos falsos creados correctamente");
}

// Función para crear datos falsos de medicamentos

export async function createMedicines() {
  for (let i = 0; i < 30; i++) {
    await Medicine.create({
      commercial_name: faker.commerce.productName(), // nombre comercial
      generic_name: faker.word.noun(), // nombre genérico
      concentration: `${faker.number.int({ min: 1, max: 500 })}mg`, // ej: "250mg"
      pharmaceutical_form: faker.helpers.arrayElement([
        "Tableta",
        "Cápsula",
        "Jarabe",
        "Inyección",
        "Crema",
        "Suspensión"
      ]),
      laboratory: faker.company.name(),
      unit_price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    });
  }

  console.log("✅ Medicamentos falsos creados correctamente");
}

async function createPrescriptions() {
  // Obtener citas y doctores existentes
  const appointments = await Appointment.findAll({ attributes: ["id"] });
  const doctors = await Doctor.findAll({ attributes: ["id"] });

  if (appointments.length === 0 || doctors.length === 0) {
    console.warn("⚠️ No hay citas o doctores para generar recetas.");
    return;
  }

  for (let i = 0; i < 40; i++) {
    const randomAppointment = faker.helpers.arrayElement(appointments);
    const randomDoctor = faker.helpers.arrayElement(doctors);

    await Prescription.create({
      appointment_id: randomAppointment.id,
      doctor_id: randomDoctor.id,
      issue_date: faker.date.recent({ days: 30 }),
      general_instructions: faker.helpers.maybe(() => faker.lorem.sentences({ min: 1, max: 2 }), { probability: 0.6 }),
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    });
  }

  console.log("✅ Recetas médicas falsas creadas correctamente");
}

async function createPrescriptionDetails() {
  // Obtener recetas y medicamentos existentes
  const prescriptions = await Prescription.findAll({ attributes: ["id"] });
  const medicines = await Medicine.findAll({ attributes: ["id"] });

  if (prescriptions.length === 0 || medicines.length === 0) {
    console.warn("⚠️ No hay recetas o medicamentos para generar detalles de recetas.");
    return;
  }

  for (let i = 0; i < 100; i++) {
    const randomPrescription = faker.helpers.arrayElement(prescriptions);
    const randomMedicine = faker.helpers.arrayElement(medicines);

    await PrescriptionDetail.create({
      prescription_id: randomPrescription.id,
      medicine_id: randomMedicine.id,
      quantity: faker.number.int({ min: 1, max: 30 }), // número de unidades
      dosage: `${faker.number.int({ min: 1, max: 2 })} ${faker.helpers.arrayElement([
        "tableta(s)",
        "cápsula(s)",
        "ml",
        "inyección(es)"
      ])} cada ${faker.number.int({ min: 6, max: 12 })} horas`,
      treatment_days: faker.number.int({ min: 3, max: 21 }), // duración en días
      special_instructions: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.4 }),
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    });
  }

  console.log("✅ Detalles de recetas médicas falsas creados correctamente");
}
async function createPayments() {
  // Obtener citas existentes para asociar los pagos
  const appointments = await Appointment.findAll({ attributes: ["id"] });

  if (appointments.length === 0) {
    console.warn("⚠️ No hay citas médicas para generar pagos.");
    return;
  }

  for (let i = 0; i < 80; i++) {
    const randomAppointment = faker.helpers.arrayElement(appointments);

    // Generar montos coherentes
    const consultationAmount = parseFloat(faker.commerce.price({ min: 20, max: 200, dec: 2 }));
    const proceduresAmount = parseFloat(faker.commerce.price({ min: 0, max: 800, dec: 2 }));
    const totalAmount = parseFloat((consultationAmount + proceduresAmount).toFixed(2));

    await Payment.create({
      appointment_id: randomAppointment.id,
      total_amount: totalAmount,
      consultation_amount: consultationAmount,
      procedures_amount: proceduresAmount,
      payment_method: faker.helpers.arrayElement(["EFECTIVO", "TARJETA", "TRANSFERENCIA"]),
      payment_date: faker.date.recent({ days: 60 }),
      payment_status: faker.helpers.arrayElement(["PENDIENTE", "COMPLETADO", "FALLIDO"]),
      invoice_number: faker.string.alphanumeric(8).toUpperCase(),
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    });
  }

  console.log("✅ Pagos falsos creados correctamente");
}