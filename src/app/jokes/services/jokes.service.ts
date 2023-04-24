import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Joke, JokeModel, PaginatedJokes } from '@shared/models/jokes.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  constructor(private http: HttpClient) {}

  getAllJokes(): Observable<Joke[]> {
    return this.http.get<Joke[]>(`jokes`);
  }

  getJokes(
    page: number,
    limit: number,
    sortBy: string,
    order: string,
    query: string
  ): Observable<PaginatedJokes> {
    return this.http
      .get<Joke[]>(
        `jokes/?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${order}&q=${query}`,
        {
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          return {
            jokes: resp.body || [],
            total: Number(resp.headers.get('X-Total-Count') || 0),
            page,
            limit,
            sortBy,
            order,
            query
          };
        })
      );
  }

  getJokeById(id: string): Observable<Joke> {
    return this.http.get<Joke>(`jokes/${id}`);
  }

  getJokesByName(name: string): Observable<Joke[]> {
    return this.http.get<Joke[]>(`/?name_like=${name}`);
  }

  createJoke(joke: JokeModel): Observable<Joke> {
    return this.http.post<Joke>(`jokes`, joke);
  }

  updateJoke(joke: Joke): Observable<Joke> {
    return this.http.put<Joke>(`jokes/${joke.id}`, joke);
  }

  deleteJoke(id: string): Observable<any> {
    return this.http.delete<any>(`jokes/${id}`);
  }
}
