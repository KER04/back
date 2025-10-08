import { Doctor } from "../models";
import { Specialty } from "../models";
import { faker } from '@faker-js/faker';

// Función para crear datos falsos de doctores

async function createFakeData() {
  for (let i = 0; i < 50; i++) {
    await Doctor.create({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      document_id: faker.string.numeric(10), // documento tipo cédula o similar
      phone: faker.string.numeric(faker.number.int({ min: 7, max: 15 })), // teléfono entre 7 y 15 dígitos
      email: faker.internet.email(),
      medical_license: faker.string.alphanumeric(8).toUpperCase(), // licencia médica
      specialty_id: faker.number.int({ min: 1, max: 10 }), // asumiendo 10 especialidades
      status: 'ACTIVE',
    });
  }
}

createFakeData()
  .then(() => console.log('✅ Datos falsos de doctores creados correctamente'))
  .catch((error) => console.error('❌ Error al crear datos falsos:', error));


/*
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

createFakeSpecialties()
  .catch((error) => console.error('❌ Error al crear especialidades falsas:', error));
*/