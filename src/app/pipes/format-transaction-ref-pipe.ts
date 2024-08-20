import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTransactionRef'
})
export class FormatTransactionRefPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string' || value.length <= 10) {
        return value;
    }

    return value.substring(0, 10) + '...';
  }
}