import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { leftPad, isString, isInteger } from '../utils/utils';

@Pipe({
  name: 'leftpad',
})
export class LeftPadPipe implements PipeTransform {
  transform(input: any, length: number = 0, character: string = ' '): any {

    if (isInteger(input)) {
      input = String(input);
    } else if (!isString(input)) {
      return input;
    }

    return leftPad(input, length, character);
  }
}
