import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../types/user.interface";
import {catchError, Observable, of} from "rxjs";
import {API_URL} from "../constants/constants";

@Injectable({
  providedIn: "root"
})
export class UsersApiService {
  constructor(private readonly http: HttpClient) {
  }

  getUsers() {
    return this.http
      .get<IUser[]>(`${API_URL}`)
      .pipe(
        catchError(this.handleError<IUser[]>('getUsers', []))
      )
      .subscribe(
        (res: IUser[]) => {
          console.log(res)
        }
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
