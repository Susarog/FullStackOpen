import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, EntryWithoutId, Entry } from '../types';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Button } from '@material-ui/core';
import AddEntriesModal from '../AddEntriesModal';

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntries = async (values: EntryWithoutId) => {
    try {
      const { data: entryFromAPI } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id!}/entries`,
        values
      );
      dispatch({
        type: 'ADD_ENTRY',
        payload: { entry: entryFromAPI, id: id! },
      });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients[id!];
  if (!patient || Object.keys(diagnoses).length === 0) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h2>
          {patient.name}{' '}
          {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h2>entries</h2>
        {patient.entries.map((entry) => {
          switch (entry.type) {
            case 'Hospital':
              return (
                <div key={entry.id}>
                  <div>
                    {entry.date} <LocalHospitalIcon />
                  </div>
                  <div>{entry.description}</div>
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
                  diagnose by {entry.specialist}
                </div>
              );
            case 'OccupationalHealthcare':
              return (
                <div key={entry.id}>
                  <div>
                    {entry.date} <WorkIcon />
                  </div>
                  <div>{entry.description}</div>
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
                  diagnose by {entry.specialist}
                </div>
              );
            case 'HealthCheck':
              return (
                <div key={entry.id}>
                  <div>
                    {entry.date} <MedicalServicesIcon />
                  </div>
                  <div>{entry.description}</div>
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
                  diagnose by {entry.specialist}
                </div>
              );
            default:
              return 'hi';
          }
        })}
        <AddEntriesModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntries}
          error={error}
          onClose={closeModal}
        />
        <Button variant='contained' onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    );
  }
};

export default PatientPage;
