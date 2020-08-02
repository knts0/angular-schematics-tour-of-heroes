import { InMemoryDbService } from 'angular-in-memory-web-api';
import { <%= classify(name) %> } from './<%= dasherize(name) %>';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const <%= namePlural %> = [
      // Please implement
    ];
    return {<%= namePlural %>};
  }

  // Overrides the genId method to ensure that a <%= name %> always has an id.
  // If the <%= namePlural %> array is empty,
  // the method below returns the initial number (11).
  // if the <%= namePlural %> array is not empty, the method below returns the highest
  // hero id + 1.
  genId(<%= namePlural %>: Hero[]): number {
    return <%= namePlural %>.length > 0 ? Math.max(...<%= namePlural %>.map(<%= name %> => <%= name %>.id)) + 1 : 11;
  }
}
