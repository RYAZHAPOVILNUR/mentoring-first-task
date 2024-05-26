import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../interfaces/users";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  // Ожидает получения объекта User
  // {required: true} -Входной параметор для @Input обязательно к заполнению
  @Input({required: true})user!: User;
  // Отправка user.id в родительский компонент для удаления юзера
  @Output() deleteUserId = new EventEmitter<number>();

  onDeleteUserId(){
    this.deleteUserId.emit(this.user.id);
  }
}
