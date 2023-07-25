import { Patient } from './patient.model';

export interface IkarusPatient {
  /**
   * The ID of a patient
   */
  Doknr: string;
  /**
   * The iBSNR
   */
  Zentrum: string;
  /**
   * Name of the facility
   */
  Betriebstätte: string;
  /**
   * First name of patient
   */
  Vorname: string;
  /**
   * Last name of patient
   */
  Nachname: string;
  /**
   * Date of birth
   */
  Geburtsdatum?: string;

}

export const mockIkarusPatient = {
  Doknr: '1234',
  Zentrum: '5678',
  Betriebstätte: 'test',
  Vorname: 'Max',
  Nachname: 'Mustermann',
  Geburtsdatum: '01/17/1960 00:00:00'
}

export const mockIkarusPatientAsPatient = {
  patientenId: '1234',
  firstName: 'Max',
  lastName: 'Mustermann',
  gender: '?',
  dateOfBirth: '01/17/1960 00:00:00',
  street: 'unknown',
  postalCode: 'unknown',
  city: 'unknown',
  country: 'unknown',
  phoneNumber: '+49??? ????????',
  email: '???.???@???.??',
  insurance: '???? Krankenkasse'
}

export function convertDtoToPatient(ikarusPatient: IkarusPatient): Patient {
  return {
    patientenId: ikarusPatient.Doknr,
    firstName: ikarusPatient.Vorname,
    lastName: ikarusPatient.Nachname,
    gender: '?',
    dateOfBirth: ikarusPatient.Geburtsdatum ?? 'unknown',
    street: 'unknown',
    postalCode: 'unknown',
    city: 'unknown',
    country: 'unknown',
    phoneNumber: '+49??? ????????',
    email: '???.???@???.??',
    insurance: '???? Krankenkasse'
  }
}
