import { InMemoryDbService } from 'angular-in-memory-web-api';
import { <%= classify(name) %> } from './<%= name %>';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const <%= camelize(namePlural) %> = [
      // Please implement
    ];
    return {<%= camelize(namePlural) %>};
  }

  // Overrides the genId method to ensure that a <%= camelize(name) %> always has an id.
  // If the <%= camelize(namePlural) %> array is empty,
  // the method below returns the initial number (11).
  // if the <%= camelize(namePlural) %> array is not empty, the method below returns the highest
  // hero id + 1.
  genId(<%= camelize(namePlural) %>: Hero[]): number {
    return <%= camelize(namePlural) %>.length > 0 ? Math.max(...<%= camelize(namePlural) %>.map(<%= camelize(name) %> => <%= camelize(name) %>.id)) + 1 : 11;
  }
}
