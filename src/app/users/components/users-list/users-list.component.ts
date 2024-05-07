import {Component, inject, OnInit} from '@angular/core'
import {UserCardComponent} from '../user-card/user-card.component'
import {MatDialog} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {CommonModule} from '@angular/common'
import {MatGridListModule} from '@angular/material/grid-list'
import {User} from '../../interface/users.interface'
import {CreateEditUserComponent} from '../create-edit-user/create-edit-user.component'
import {Store} from '@ngrx/store'
import {
  addUserAction,
  deleteUserAction,
  editUserAction,
  loadUserAction,
} from '../../store/users.action'
import {AppState} from '../../../app.state'
import {Observable} from 'rxjs'
import {selectAllUsers} from '../../store/users.selector'

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private readonly dialog = inject(MatDialog)
  private readonly store = inject(Store<AppState>)
  users$: Observable<User[]> = this.store.select(selectAllUsers)

  ngOnInit(): void {
    this.store.dispatch(loadUserAction())
  }

  onAddUser(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {})
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(addUserAction(result))
      }
    })
  }

  onEditUser(user: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(editUserAction(result))
      }
    })
  }

  onDeleteUser(userId: number): void {
    this.store.dispatch(deleteUserAction({userId: userId}))
  }
}
