import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../types/user.model";
import {catchError, Observable, of} from "rxjs";
import {API_URL} from './api-url.token';

@Injectable({
  providedIn: "root"
})
export class UsersApiService {
  private readonly apiUrl = inject(API_URL);
  private readonly http = inject(HttpClient)

  public get(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError<User[]>('get', [])));
  }

  public post(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user)
      .pipe(catchError(this.handleError<User>('post')));
  }

  public delete(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`)
      .pipe(catchError(this.handleError<User>('delete')));
  }

  public patch(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${user.id}`, user)
      .pipe(catchError(this.handleError<User>('patch')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
