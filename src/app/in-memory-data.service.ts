import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { of } from 'rxjs';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    const heroes = [
      {id : 11, name: 'Mr. Qas1'},
      {id : 12, name: 'Mr. Qas2'},
      {id : 13, name: 'Mr. Qas3'},
      {id : 14, name: 'Mr. Qas4'},
      {id : 15, name: 'Mr. Qas5'},
      {id : 16, name: 'Mr. Qas6'},
      {id : 17, name: 'Mr. Qas7'},
      {id : 18, name: 'Mr. Qas8'},
      {id : 19, name: 'Mr. Qas9'},
      {id : 20, name: 'Mr. Qas10'}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
