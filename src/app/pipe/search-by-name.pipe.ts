import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultUsers = [];
    for (const user of value) {
      if (user.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultUsers.push(user);
      }
    }
    return resultUsers;
  }

}
