import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private usersService = inject(UsersService);
  public readonly users$ = this.usersService.users$

  constructor(){}

  ngOnInit(): void {
    this.usersService.loadUsers()
  }
  
  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

}
