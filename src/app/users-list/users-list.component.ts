import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  readonly apiService = inject(HttpClient);
  users :any = [];
  expression = false

  constructor() {
    this.apiService.get('https://jsonplaceholder.typicode.com/users').subscribe(
      (response) => this.users = response
    )
  }

  deleteUser(id: number){
    this.users = this.users.filter((item: any) => item.id !== id)
  }
}
