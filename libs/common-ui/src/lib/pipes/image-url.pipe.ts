import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return null;
    return `https://icherniakov.ru/yt-course/${value}`;
  }
}
