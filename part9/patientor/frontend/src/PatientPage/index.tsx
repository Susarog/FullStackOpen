import React from 'react';
import { Patient } from '../types';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () => {
  const [{ patients, diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients[id!];
  if (!patient || Object.keys(diagnoses).length === 0) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h2>
          {patient.name}
          {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h2>entries</h2>
        {patient.entries.map((entry) => {
          return (
            <div key={entry.id}>
              <div>
                {entry.date} {entry.description}
              </div>
              {entry.diagnosisCodes ? (
                <ul>
                  {entry.diagnosisCodes.map((code) => {
                    return (
                      <li key={code}>
                        {code} {diagnoses[code].name}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
};

export default PatientPage;
