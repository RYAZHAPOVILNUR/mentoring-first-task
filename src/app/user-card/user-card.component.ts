import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user.model';
import { MatButtonModule } from '@angular/material/button';

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
}
