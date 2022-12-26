import { Patient, NonSensitivePatientsData, NewPatient } from '../types';
import patientEntries from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getEntries = (): Array<Patient> => {
  return patientEntries;
};

const getPatient = (id: string): Patient | undefined => {
  return patientEntries.find((patient) => patient.id === id);
};

const getNonSensitiveData = (): Array<NonSensitivePatientsData> => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patientEntries.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveData,
  getEntries,
  addPatient,
  getPatient,
};
