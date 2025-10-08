import { Patient } from './patient';
import { Specialty } from './specialty';
import { Medicine } from './medicine';
import { Doctor } from './doctor';
import { Appointment } from './appointment';
import { Diagnosis } from './diagnosis';
import { Procedure } from './procedure';
import { Prescription } from './prescription';
import { PrescriptionDetail } from './prescriptiondetail';
import { Payment } from './payment';
import  sequelize  from '../database/db';

// =====================================================
// DEFINIR RELACIONES (ASSOCIATIONS)
// =====================================================

// Specialty -> Doctor (1:N)
Specialty.hasMany(Doctor, { foreignKey: 'specialty_id', as: 'doctors' });
Doctor.belongsTo(Specialty, { foreignKey: 'specialty_id', as: 'specialty' });


// Patient -> Appointment (1:N)
Patient.hasMany(Appointment, { foreignKey: 'patient_id', as: 'appointments' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });

// Doctor -> Appointment (1:N)
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id', as: 'appointments' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

// Patient -> Diagnosis (1:N)
Patient.hasMany(Diagnosis, { foreignKey: 'patient_id', as: 'diagnoses' });
Diagnosis.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });

// Appointment -> Diagnosis (1:N)
Appointment.hasMany(Diagnosis, { foreignKey: 'appointment_id', as: 'diagnoses' });
Diagnosis.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

// Appointment -> Procedure (1:N)
Appointment.hasMany(Procedure, { foreignKey: 'appointment_id', as: 'procedures' });
Procedure.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

// Appointment -> Prescription (1:N)
Appointment.hasMany(Prescription, { foreignKey: 'appointment_id', as: 'prescriptions' });
Prescription.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

// Doctor -> Prescription (1:N)
Doctor.hasMany(Prescription, { foreignKey: 'doctor_id', as: 'prescriptions' });
Prescription.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

// Prescription -> PrescriptionDetail (1:N)
Prescription.hasMany(PrescriptionDetail, { foreignKey: 'prescription_id', as: 'details' });
PrescriptionDetail.belongsTo(Prescription, { foreignKey: 'prescription_id', as: 'prescription' });

// Medicine -> PrescriptionDetail (1:N) 
Medicine.hasMany(PrescriptionDetail, { foreignKey: 'medicine_id', as: 'prescription_details' });
PrescriptionDetail.belongsTo(Medicine, { foreignKey: 'medicine_id', as: 'medicine' });

// Appointment -> Payment (1:1)
Appointment.hasOne(Payment, { foreignKey: 'appointment_id', as: 'payment' });
Payment.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

// =====================================================
// EXPORTAR TODOS LOS MODELOS
// =====================================================

export {
  Patient,
  Specialty,
  Medicine,
  Doctor,
  Appointment,
  Diagnosis,
  Procedure,
  Prescription,
  PrescriptionDetail,
  Payment
};

// Función para sincronizar todos los modelos
export const syncAllModels = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ All models synchronized successfully');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
    throw error;
  }
};