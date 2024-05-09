import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user.model';
import { MatButtonModule } from '@angular/material/button';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {  
  
  @Input({required:true})user!: User;
  @Output() deleteUserEvent = new EventEmitter<number>();

  onDeleteUser(): void {
    this.deleteUserEvent.emit(this.user.id);
  }

  constructor(public dialog: MatDialog) {}
  
  openDialog(user: User): void {
    this.dialog.open(AddUserDialogComponent, {
      data: {
        user: user
      }
    });
  }
}
