import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { User } from '../../interfaces/users';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user: User | undefined;
  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<number>();

  onDeleteUser():void {
    this.deleteUser.emit(this.user?.id)
  }

  onEditUser():void {
    this.editUser.emit(this.user?.id)
  }
}
