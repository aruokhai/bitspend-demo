import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundAmount'
})
export class RoundAmountPipe implements PipeTransform {
  transform(value: number | null): string {
    if(!value || value === 0) return '0'
    const toNumber = value.toString()
    const decimal = toNumber.match(/\.(\d+)/);
    if (decimal && decimal[1].length < 3) {
        return toNumber;
    }
    return parseFloat(toNumber).toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
}