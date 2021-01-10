import { v4 as uuid } from 'uuid';
import { Patient, PatientWithoutSsn, NewPatientEntry } from './../types';
import patients from '../../data/patients';

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...patientInfo }) => ({ ...patientInfo }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientsWithoutSsn,
  addPatient,
};
