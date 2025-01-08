import { Component, EventEmitter, Input, Output } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector:'app-user-card',
  templateUrl:'./user-card.component.html',
  styleUrl:'./user-card.component.scss',
  standalone:true,
  imports: [MatCardModule, MatButton],
})
export class UserCardComponent{

  @Input()
  user:any

  @Output()
  deleteUser = new EventEmitter()

  @Output()
  userEdit = new EventEmitter()

  onDeleteUser(userId:number) {
    this.deleteUser.emit(userId)
  }

  onUserEdit(user: any) {
    this.userEdit.emit(user)
  }
}