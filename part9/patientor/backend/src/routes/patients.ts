import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry } from '../utils';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(400).send({ error: 'malformatted id' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    res.status(400).send({ error: (error as Error).message });
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (!patient) {
    res.status(400).send({ error: 'malformatted id' });
  }
  try {
    const entries = toNewEntry(req.body);
    const addedEntries = patientsService.addEntry(req.params.id, entries);
    res.json(addedEntries);
  } catch (error: unknown) {
    res.status(400).send({ error: (error as Error).message });
  }
});

export default router;
