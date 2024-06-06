import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { addUserAction, deleteUserAction, editUserAction, loadUserAction } from '../../ngrx/users.actions'
import { UserSelector } from '../../ngrx/users.selector'
import { User } from '../../user.model'
import { PopupComponent } from '../popup/popup.component'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  public users$: Observable<User[]>

  ngOnInit(): void { this.store.dispatch(loadUserAction())}
  
  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {this.users$ = this.store.select(UserSelector)}

  public openPopup(isEdit: boolean, user?: User): void {
    const popup = this.dialog.open(PopupComponent, {
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: isEdit ? 'User Edit' : "Add User",
        isEdit,
        user
      }
    })
    popup.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit && user) {
          this.store.dispatch(editUserAction({ id: user.id, ...result }))
        } else {
          this.store.dispatch(addUserAction({user: result}))
        }
      }
    })
  }
  
  public deleteUser(id: number): void {this.store.dispatch(deleteUserAction({ id }))
  }
}