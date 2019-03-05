import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';


import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { of, Observable, interval } from 'rxjs';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private heroesUrl = 'api/heroes';  // URL to web api
    
  constructor(
    private messageService:MessageService,
    private http:HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    //this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(() => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    )

    //return of(HEROES) ;
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(()=> this.log(`fetched hero id= ${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
    // this.messageService.add(`HeroService: fetched hero id = ${id}`);
    // return of(HEROES.find(hero => hero.id === id)) ;
  }

  updateHero(hero: Hero): Observable<null | Hero> {
    return this.http.put<Hero>(this.heroesUrl,hero,httpOptions)
    .pipe(
      tap(()=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero:Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
      
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
searchHeroes(term : string) : Observable<Hero[]>{
  if(!term.trim()){
    return of([])
  }

  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(),
    catchError(this.handleError<Hero[]>('searchHeroes',[]))
  );
}

  private log(message : string){
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
