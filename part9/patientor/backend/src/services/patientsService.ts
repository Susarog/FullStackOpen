import {
  Patient,
  NonSensitivePatientsData,
  NewPatient,
  Entry,
  EntryWithoutId,
} from '../types';
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
    entries: [],
  };
  patientEntries.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = getPatient(id);
  const newEntry = { ...entry, id: uuid() };
  patient!.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitiveData,
  getEntries,
  addPatient,
  getPatient,
  addEntry,
};
