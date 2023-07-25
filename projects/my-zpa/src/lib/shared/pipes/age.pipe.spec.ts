import {AgePipe} from './age.pipe';

describe('AgePipe', () => {
  let pipe: AgePipe;
  const birthdate = '22.11.1993';
  const date = new Date(birthdate.split('.').reverse().join('/'));

  beforeEach(() => {
    pipe = new AgePipe();
  });

  jest
    .spyOn(Date, 'now')
    .mockImplementationOnce(() =>
      new Date('2022-05-14T00:00:00.000Z').valueOf()
    );

  it('should return age', () => {
    const today = new Date();

    let difYear = today.getFullYear() - date.getFullYear()
    let difMonth = (today.getMonth() + 1) - (date.getMonth() + 1)
    if (difMonth < 0 || (difMonth === 0 && today.getDate() < date.getDate())) {
      difYear--;
    }
    if (difMonth < 0) {
      difMonth = (12 + difMonth);
    }

    const yearSpecifier = difYear > 1 || difYear === 0 ? 'Jahre' : 'Jahr';
    const monthSpecifier = difMonth > 1 || difMonth === 0 ? 'Monate' : 'Monat';
    const result = difYear + ` ${yearSpecifier}, ` + difMonth + ` ${monthSpecifier}`;
    expect(pipe.transform(birthdate)).toEqual(result);
  });

  it('should calculate years', () => {
    const today = new Date();
    let difYear = today.getFullYear() - date.getFullYear()
    let difMonth = today.getMonth() - date.getMonth()

    if (difMonth < 0 || (difMonth === 0 && today.getDate() < date.getDate())) {
      difYear--;
    }

    expect(pipe['calculateAgeYears'](date)).toEqual(difYear);
  });

  it('should calculate months', () => {
    const today = new Date();

    let difMonth = (today.getMonth() + 1) - (date.getMonth() + 1)

    if (difMonth < 0) {
      difMonth = (12 + difMonth);
    }

    expect(pipe['calculateAgeMonths'](date)).toEqual(difMonth);
  });

  it('should return empty string', () => {
    expect(pipe.transform(undefined)).toEqual('');
    expect(pipe.transform('randomLetters')).toEqual('');
  });
});
