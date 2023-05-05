import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string | null, referenceDate: string = new Date().toISOString()): string {
    if (value === null) {
      return 'N/A';
    }
    const formattedValue = this.datePipe.transform(value, 'dd/MM/yyyy HH:mm:ss') || '';
    const diffInDays = Math.floor((new Date(referenceDate).getTime() - new Date(value).getTime()) / (1000 * 60 * 60 * 24));
    //return `${formattedValue} (${diffInDays} days ago)`;
    return `${diffInDays} days ago`;
  }
}
