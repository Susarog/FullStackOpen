import {
  NewPatient,
  Gender,
  EntryWithoutId,
  BaseEntryWithoutId,
  HealthCheckRating,
  Discharge,
  SickLeave,
  Diagnosis,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dob');
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!(typeof rating === 'number') || !isHealthCheckRating(rating)) {
    throw new Error();
  }
  return rating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is Discharge => {
  return (
    discharge.date !== undefined &&
    isString(discharge.date) &&
    discharge.criteria !== undefined &&
    isString(discharge.criteria)
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};
type EntryType = 'OccupationalHealthcare' | 'Hospital' | 'HealthCheck';

const isEntryType = (type: string): type is EntryType => {
  return (
    type === 'OccupationalHealthcare' ||
    type === 'Hospital' ||
    type === 'HealthCheck'
  );
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type');
  }
  return type;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  return (
    sickLeave.startDate !== undefined &&
    isString(sickLeave.startDate) &&
    isDate(sickLeave.startDate) &&
    sickLeave.endDate !== undefined &&
    isString(sickLeave.endDate) &&
    isDate(sickLeave.endDate)
  );
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    return undefined;
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCodes = (code: any): code is Array<Diagnosis['code']> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  for (let i = 0; i < code.length; i++) {
    if (!isString(code[i])) {
      return false;
    }
  }
  return true;
};

const parseDiagnosisCodes = (
  code: unknown
): Array<Diagnosis['code']> | undefined => {
  if (!code || !Array.isArray(code) || !isDiagnosisCodes(code)) {
    return undefined;
  }
  return code;
};

export const toNewEntry = (entry: any): EntryWithoutId => {
  const diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  let baseEntry: BaseEntryWithoutId;
  if (diagnosisCodes) {
    baseEntry = {
      description: parseDescription(entry.description),
      date: parseDateOfBirth(entry.date),
      specialist: parseSpecialist(entry.specialist),
      diagnosisCodes: diagnosisCodes,
    };
  } else {
    baseEntry = {
      description: parseDescription(entry.description),
      date: parseDateOfBirth(entry.date),
      specialist: parseSpecialist(entry.specialist),
    };
  }
  const entryType = parseEntryType(entry.type);
  switch (entryType) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: entryType,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case 'Hospital':
      return {
        ...baseEntry,
        type: entryType,
        discharge: parseDischarge(entry.discharge),
      };
    case 'OccupationalHealthcare':
      const sickLeave = parseSickLeave(entry.sickLeave);
      if (!sickLeave) {
        return {
          ...baseEntry,
          type: entryType,
          employerName: parseName(entry.employerName),
        };
      } else {
        return {
          ...baseEntry,
          type: entryType,
          employerName: parseName(entry.employerName),
          sickLeave: sickLeave,
        };
      }
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
};

export default toNewPatient;
