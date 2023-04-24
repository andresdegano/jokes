import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailObfuscation',
})
export class EmailObfuscationPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    const splitted = value?.split('@') || [''];
    const domain = splitted[1]?.split('.') || [];
    return `${splitted[0] || ''}@***.${
      !!domain.length ? domain[domain.length - 1] : 'com'
    }`;
  }
}
