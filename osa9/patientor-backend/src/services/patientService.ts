import { PatientWithoutSsn } from './../types';
import patients from '../../data/patients';

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patients.map(({ ssn, ...patientInfo }) => ({ ...patientInfo }));
};

export default {
  getPatientsWithoutSsn,
};
