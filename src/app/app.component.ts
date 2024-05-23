import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersListComponent } from './components/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { User } from './components/user';
import { UsersApiService } from './http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [UsersApiService],
  // templateUrl: './app.component.html',
  template: `<ul>
  @for(user of users; track $index){
      <li>
          <p>Name: {{user?.name}}</p>
          <p>Nick: {{user?.username}}</p>
      </li>
}
</ul>`,
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersApiService
  ) { }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe((users: any) => this.users = users)
  }

  ngOnInit() {
    this.getUsers()
  }
}