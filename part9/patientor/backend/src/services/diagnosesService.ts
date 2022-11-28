import { Diagnoses } from '../types';
import diagnosesEntries from '../../data/diagnoses';

const getEntries = (): Array<Diagnoses> => {
  return diagnosesEntries;
};
export default {
  getEntries,
};
