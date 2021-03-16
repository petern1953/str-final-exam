import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: User[] | null, phrase: string, key: string): any {
    if (!Array.isArray(value) || !phrase || !key) return value;

    let lcPhrase = ('' + phrase).toLowerCase();
        if ( key === "name" )

      return value.filter((item) =>
        ('' + item[key]).toLowerCase().includes(lcPhrase)
      );
  }
}
