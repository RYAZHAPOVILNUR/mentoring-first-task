import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../users.interface';
import { MatButtonModule } from '@angular/material/button';
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

  private dialog = inject(MatDialog);

  onDeleteUser(): void {
    this.deleteUserEvent.emit(this.user.id);
  }

}
