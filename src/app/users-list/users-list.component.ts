import { Component, OnInit } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  public readonly users$ = this.usersService.users$

  constructor(
    private usersService: UsersService
  ) {}

  
  ngOnInit(): void {
    this.usersService.loadUsers()
  }
  
  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

}
