import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UsersApiService } from '../users-api-service.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { Observer } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(private usersApiService: UsersApiService) { }

  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(this.users); // Можете здесь обрабатывать полученные данные
      },
      error => {
        console.error(error);
      }
    );
  }

}
