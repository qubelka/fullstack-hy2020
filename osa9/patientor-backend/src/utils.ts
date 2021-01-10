import { Gender } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry } from './types';

const alphabetWithoutRestrictedChars = /[ABCDEFHJKLMNPRSTUVWXY0-9]/;

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringInput = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error(`Icorrect or missing value: ${String(param)}`);
  }
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Icorrect or missing dateOfBirth: ${String(dateOfBirth)}`);
  }
  return dateOfBirth;
};

const isSsn = (ssn: string): boolean => {
  const lastCharacterOfSsn = ssn.charAt(ssn.length - 1);
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  if (!lastCharacterOfSsn.match(alphabetWithoutRestrictedChars)) {
    return false;
  }

  const parts = ssn.slice(0, ssn.length - 1).split(/[-+A]/);

  if (parts.length !== 2) return false;

  const validDate = new Date(
    `${parts[0].slice(2, 4)}/${parts[0].slice(0, 2)}/${parts[0].slice(
      4
    )} 00:00:00+00`
  );

  if (!validDate) {
    return false;
  }

  const number = Number(parts[1].slice(0, 3));

  if (isNaN(number) || number < 2 || number > 899) {
    return false;
  }

  return true;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error(`Icorrect or missing ssn: ${String(ssn)}`);
  }
  return ssn;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Icorrect or missing gender: ${String(gender)}`);
  }
  return gender;
};

const toNewPatientEntry = (data: any): NewPatientEntry => {
  return {
    name: parseStringInput(data.name),
    dateOfBirth: parseDateOfBirth(data.dateOfBirth),
    ssn: parseSsn(data.ssn),
    gender: parseGender(data.gender),
    occupation: parseStringInput(data.occupation),
  };
};

export default toNewPatientEntry;
