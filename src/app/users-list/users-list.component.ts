import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AddUserDialogComponent,
    UserCardComponent,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private usersService = inject(UsersService);
  private dialog = inject(MatDialog);
  public readonly users$ = this.usersService.users$

  dialogOpen = false;
  user!: User;
  data!: User;  
  
  constructor(){}

  ngOnInit(): void {
    this.usersService.loadUsers()
  }
  
  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.usersService.addUser(newUser)
        this.users$.subscribe({})
      }
    });
  }

  openDialogWithCard(currentUser: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: {
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        username: currentUser.username,
        website: currentUser.website,
      }
    });
    dialogRef.afterClosed().subscribe(editUser => {
      if (editUser) {
        editUser.id = currentUser.id
        this.usersService.updateUser(editUser)
        this.users$.subscribe({})
      }
    });
  }
}
