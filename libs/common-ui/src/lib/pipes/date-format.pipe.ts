import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: string | null,
    serverTimezone: string = 'UTC',
  ): string | null {
    if (!value) return null;

    const now = new Date();
    let postDate: Date;

    if (serverTimezone === 'UTC') {
      let dateString = value;
      if (
        !value.includes('Z') &&
        !value.includes('+') &&
        !value.includes('-', 10)
      ) {
        dateString = value + 'Z';
      }
      postDate = new Date(dateString);
    } else {
      postDate = new Date(value);
    }

    const diffMs = now.getTime() - postDate.getTime();

    if (diffMs < 0) return this.formatFullDate(postDate);

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let timeCategory: string;
    if (diffMinutes < 1) {
      timeCategory = 'justNow';
    } else if (diffMinutes < 60) {
      timeCategory = 'minutes';
    } else if (diffHours < 24) {
      timeCategory = 'hours';
    } else if (diffDays < 7) {
      timeCategory = 'days';
    } else {
      timeCategory = 'fullDate';
    }

    switch (timeCategory) {
      case 'justNow':
        return 'только что';

      case 'minutes':
        return `${diffMinutes} ${this.getMinuteWord(diffMinutes)} назад`;

      case 'hours':
        return `${diffHours} ${this.getHourWord(diffHours)} назад`;

      case 'days':
        return `${diffDays} ${this.getDayWord(diffDays)} назад`;

      case 'fullDate':
        return this.formatFullDate(postDate);

      default:
        return 'неизвестно';
    }
  }

  private formatFullDate(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  }

  private getMinuteWord(count: number): string {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'минуту';
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return 'минуты';
    } else {
      return 'минут';
    }
  }

  private getHourWord(count: number): string {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'час';
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return 'часа';
    } else {
      return 'часов';
    }
  }

  private getDayWord(count: number): string {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'день';
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return 'дня';
    } else {
      return 'дней';
    }
  }
}
