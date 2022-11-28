import { Patients, NonSensitivePatientsData, NewPatient } from '../types';
import patientEntries from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getEntries = (): Array<Patients> => {
  return patientEntries;
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

const addPatient = (patient: NewPatient): Patients => {
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
};
