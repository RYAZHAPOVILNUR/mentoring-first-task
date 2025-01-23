import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component'
import { User } from '../../types/user.types'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  standalone: true,
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input()
  user!: User

  @Output()
  deleteUser = new EventEmitter()

  @Output()
  editUser = new EventEmitter()

  readonly dialog = inject(MatDialog)

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    })

    dialogRef.afterClosed().subscribe((editResult) => {
      if (!editResult) return

      this.editUser.emit(editResult)
    })
  }

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId)
  }
}
