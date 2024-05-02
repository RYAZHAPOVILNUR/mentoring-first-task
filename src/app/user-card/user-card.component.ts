import { Component, Input, inject } from '@angular/core';
import { User } from '../user.model';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {  
  @Input({required:true})user!: User;
  private readonly userList = inject(UsersListComponent);
}
