import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UsersBackType } from '../../shared/types/users-backend.type';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UsersBackModalWindowComponent } from './users-list-modal-window/users-back-modal-window.component';
import { UserBackCardComponent } from './user-card/user-back-card.component';
import { UsersBackendService } from '../../core/services/backend-users/users-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-data-from-backend',
  standalone: true,
  imports: [CommonModule, MatButtonModule, UserBackCardComponent],
  templateUrl: './users-data-from-backend.component.html',
  styleUrl: './users-data-from-backend.component.scss'
})
export class UsersDataFromBackendComponent {
  users: UsersBackType[] = []
  user!: UsersBackType
  redact: boolean = false

  some!: string

  constructor(
    public dialog: MatDialog,
    // private store: Store,
    private usersBackendService: UsersBackendService,
    private route: Router

  ) { }

  ngOnInit() {
    this.getUsersForList()
  }

  getUsersForList() {

    this.usersBackendService.getAllBackUsers().subscribe(
      (data: UsersBackType[]) => {
        this.users = data.sort((a, b) => b.id - a.id)
        console.log(this.users);
      },
      (error) => {
        console.error(error);
        alert('что-то пошло не так, попробуйте заново авторизоваться');
        this.route.navigate(['/login'])
      }
    );
    // this.store.dispatch(loadUsers())
    // this.store.select(getUserList).subscribe(data => this.users = data)
  }

  deleteUser(user: UsersBackType) {
    if (confirm("Do you want to remove?")) {
      // this.store.dispatch(deleteUser({ id: user.id }))
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    redact: boolean
  ): void {
    this.dialog.open(UsersBackModalWindowComponent,
      {
        minWidth: '40vw',
        maxWidth: '90vw',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { redact }
      }
    )
  }
}
