import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityLabel'
})
export class PriorityLabelPipe implements PipeTransform {

  transform(value: unknown): string {
    switch (value) {
      case 1:
        return 'Minor';
      case 2:
        return 'Major';
      case 3:
        return 'Critical'
      default:
        return 'Undefined'
      }
    }
  }
