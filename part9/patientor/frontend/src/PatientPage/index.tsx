import React from 'react';
import { Patient } from '../types';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients[id!];
  console.log(patient);
  if (!patient) {
    return <div>error</div>;
  } else {
    return (
      <div>
        <h2>
          {patient.name}
          {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
      </div>
    );
  }
};

export default PatientPage;
