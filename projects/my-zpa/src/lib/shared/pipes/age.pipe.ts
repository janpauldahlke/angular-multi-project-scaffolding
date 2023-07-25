import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(birthdate: string | undefined) {
    if (!birthdate) {
      return '';
    }

    // expecting date format dd.mm.yyyy (still works with mm/dd/yyyy anyway)
    const date = new Date(birthdate.split('.').reverse().join('/'));
    if (date && !isNaN(date.getDate())) {
      const years = this.calculateAgeYears(date);
      const months = this.calculateAgeMonths(date);
      const yearSpecifier = years > 1 || years === 0 ? 'Jahre' : 'Jahr';
      const monthSpecifier = months > 1 || months === 0 ? 'Monate' : 'Monat';
      return years + ` ${yearSpecifier}, ` + months + ` ${monthSpecifier}`;
    } else {
      return '';
    }
  }

  private calculateAgeYears(birthday: Date): number {
    let today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    let month = today.getMonth() - birthday.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  private calculateAgeMonths(birthday: Date): number {
    const currentMonth = new Date().getMonth();
    const birthdayMonth = birthday.getMonth();
    let monthDiff = currentMonth - birthdayMonth
    if (monthDiff < 0) monthDiff = monthDiff + 12
    return monthDiff;
  }
}
