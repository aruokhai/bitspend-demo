import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNarration'
})
export class FormatNarrationPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string' || value.length <= 20) {
        return value;
    }

    return value.substring(0, 20) + '...';
  }
}