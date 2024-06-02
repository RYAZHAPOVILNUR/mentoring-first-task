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

  public get(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}`)
      .pipe(catchError(this.handleError<User[]>('get', [])));
  }

  public post(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}`, user)
      .pipe(catchError(this.handleError<User>('post')));
  }

  public delete(userId: number): Observable<User> {
    return this.http.delete<User>(`${API_URL}/${userId}`)
      .pipe(catchError(this.handleError<User>('delete')));
  }

  public patch(user: User): Observable<User> {
    return this.http.patch<User>(`${API_URL}/${user.id}`, user)
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
