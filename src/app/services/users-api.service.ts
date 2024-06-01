import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../types/user.model";
import {catchError, Observable, of} from "rxjs";
import {API_URL} from "../constants/constants";

@Injectable({
  providedIn: "root"
})
export class UsersApiService {
  constructor(private readonly http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${API_URL}/users`)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
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
