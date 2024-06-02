import { Component,Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user: any;
  @Output() userDeleted = new EventEmitter<number>();

  deleteUser(): void {
    this.userDeleted.emit(this.user.id);
  }
}
