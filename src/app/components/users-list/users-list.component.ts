import { Component, inject, OnInit } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { UserCardComponent } from '../user-card/user-card.component'
import { MatButton, MatFabButton } from '@angular/material/button'
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { User } from '../../data/interfaces/users.interface'
import { ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import {
  addUser, deleteUser, loadUsers,
  loadUsersSuccess, updateUser
} from '../../state/users/users.actions'
import { IUsersState } from '../../data/interfaces/usersState.interface'
import { selectUsers } from '../../state/users/users.selectors'
import { LocalStorageService } from '../../services/local-storage.service'

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    ReactiveFormsModule, UserCardComponent, AsyncPipe,
    MatButton, MatFabButton, MatGridList, MatGridTile,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private store = inject(Store<IUsersState>)
  public readonly users$ = this.store.select(selectUsers)
  private dialog = inject(MatDialog)
  public localStorageService = inject(LocalStorageService)

  ngOnInit() {
    const localUsers: User[] | null = this.localStorageService.getUsers()
    if (localUsers && localUsers.length > 0) {
      this.store.dispatch(loadUsersSuccess({ users: localUsers }))
    } else {
      this.store.dispatch(loadUsers())
    }
  }

  public onDeleteUser(id: number): void {
    this.store.dispatch(deleteUser({ userId: id }))
  }

  public openDialog(user?: User): void {
    const dialogRef: MatDialogRef<CreateEditUserComponent> =
      this.dialog.open(CreateEditUserComponent, {
      width: '40%',
      data: { user: user || {}, isEdit: !!user },
    })
    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser) {
        if (user) {
          this.store.dispatch(updateUser({ user: newUser }))
        } else {
          this.store.dispatch(addUser({ user: newUser }))
        }
      }
    })
  }
}
