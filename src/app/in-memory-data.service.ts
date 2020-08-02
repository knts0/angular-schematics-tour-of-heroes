import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {
      heroes, 
    };
  }

  // Overrides the genId method to ensure that an element always has an id.
  // If the array is empty,
  // the method below returns the initial number (11).
  // if the array is not empty, the method below returns the highest
  // id + 1.
  genId(ary: any[]): number {
    return ary.length > 0 ? Math.max(...ary.map(elm => elm.id)) + 1 : 11;
  }
}
