import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import User from '../../interface/interface';
import { UsersServiceService } from '../../service/users-service';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../service/local-storage.service';




@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ MatButtonModule, ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user!: User; 
  @Output() userDelete = new EventEmitter();
  @Output() userEdit = new EventEmitter<User>();
  
  userService = inject(UsersServiceService);
  localStorage = inject(LocalStorageService);
   

  onUserDelete(user: User) {
    this.userDelete.emit(user.id);
  }
  
  onUserEdit() {
    this.userEdit.emit(this.user);
  }
}