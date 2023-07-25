export interface Patient {
  patientenId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
  insurance: string;
}

export const mockPatients: Patient[] = [
  {
    patientenId: '106-1~8714',
    firstName: 'Max',
    lastName: 'Meyer',
    gender: 'W',
    dateOfBirth: '03.04.1970',
    street: 'Karl-Marx-Allee 203',
    postalCode: '10243',
    city: 'Berlin',
    country: 'Deutschland',
    phoneNumber: '+49172 539167993',
    email: 'Ines.meyer@gmx.de',
    insurance: 'Techniker Krankenkasse'
  },
  {
    patientenId: '106-1~8714',
    firstName: 'Gundula',
    lastName: 'Hildemeier',
    gender: 'W',
    dateOfBirth: '02.04.1930',
    street: 'Karl-Marx-Allee 203',
    postalCode: '10243',
    city: 'Berlin',
    country: 'Deutschland',
    phoneNumber: '+49172 539167993',
    email: 'Ines.meyer@gmx.de',
    insurance: 'Techniker Krankenkasse'
  },
  {
    patientenId: '106-1~8714',
    firstName: 'Hilde',
    lastName: 'Riegel',
    gender: 'W',
    dateOfBirth: '22.02.1976',
    street: 'Karl-Marx-Allee 203',
    postalCode: '10243',
    city: 'Berlin',
    country: 'Deutschland',
    phoneNumber: '+49172 539167993',
    email: 'Ines.meyer@gmx.de',
    insurance: 'Techniker Krankenkasse'
  },
  {
    patientenId: '106-1~8714',
    firstName: 'Hildemarie',
    lastName: 'Schmidt',
    gender: 'W',
    dateOfBirth: '31.01.1989',
    street: 'Karl-Marx-Allee 203',
    postalCode: '10243',
    city: 'Berlin',
    country: 'Deutschland',
    phoneNumber: '+49172 539167993',
    email: 'Ines.meyer@gmx.de',
    insurance: 'Techniker Krankenkasse'
  },
  {
    patientenId: '106-1~8714',
    firstName: 'Peter',
    lastName: 'Hildger',
    gender: 'M',
    dateOfBirth: '17.11.2001',
    street: 'Karl-Marx-Allee 203',
    postalCode: '10243',
    city: 'Berlin',
    country: 'Deutschland',
    phoneNumber: '+49172 539167993',
    email: 'Ines.meyer@gmx.de',
    insurance: 'Techniker Krankenkasse'
  }
];

export const mockPatientAsJSON = (patient: Patient) => JSON.stringify(patient);

