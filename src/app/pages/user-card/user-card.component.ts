import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interface/users.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ MatButtonModule, MatCardModule ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<User>();

  deleteUser(): void {
    this.delete.emit(this.user.id)    
  }
  editUser(): void {
    this.edit.emit(this.user)
  }
}
