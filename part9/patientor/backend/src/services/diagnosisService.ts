import { Diagnosis } from '../types';
import diagnosisEntries from '../../data/diagnosis';

const getEntries = (): Array<Diagnosis> => {
  return diagnosisEntries;
};
export default {
  getEntries,
};
