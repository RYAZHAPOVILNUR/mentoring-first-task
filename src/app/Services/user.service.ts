import { inject, Injectable } from '@angular/core';
import { UsersApiService } from '../usersApi.service';
import { User } from '../users.interface';
import { BehaviorSubject,map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly api = inject(UsersApiService);

  private readonly usersSubject$  = new BehaviorSubject<User[]>([]);

  public readonly users$ = this.usersSubject$.asObservable();

  public loadUsers(): void {
    this.api.getUsers().subscribe((users) => {
      this.usersSubject$.next(users);
    });
  }

  public deleteUser(id: number): void {
    this.usersSubject$.next(
      this.usersSubject$.value.filter(user => user.id !== id)
    );
  }
}
// public deleteUser(userId: User): void{
//
//   this.usersSubject$.pipe(
//     map.(users=> users.filter(user=> user.id !== userId))
//   )
//     .subscribe((filteredUsers)=> {
//       this.usersSubject$.next(filteredUsers)
//     })
// }

// this.api.getUsers().subscribe(
//   (response: User)=> {
//     this.usersSubject$.next(
//       this.usersSubject$.value.filter(
//         user => user.id != response.id
//       )
//     );
//   }
// )
// this.usersSubject$.next([
//   ...this.usersSubject$.value.filter((user)=> user.id != userToDelete.id)
// ])
