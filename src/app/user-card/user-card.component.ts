import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { Input } from '@angular/core';
import {User } from '../interface/users.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { CreateEditUserComponen } from '../create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [UserListComponent, MatButtonModule, MatCardModule, CreateEditUserComponen],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent implements OnInit{
 @Input({required: true})user!: User
 @Output() remove= new EventEmitter<number>()
  @Output() editUserEvent = new EventEmitter<User>()
 
 ngOnInit(): void {
console.log(this.user.name)
 } 

 public removeUser(id: number){
      this.remove.emit(this.user.id)
 }

 public redaction(user: any){
  console.log(user)
   this.editUserEvent.emit(user)
 }

}
