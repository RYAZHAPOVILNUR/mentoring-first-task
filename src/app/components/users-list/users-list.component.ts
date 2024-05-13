import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { StorageService } from '../../services/localstorage.service';

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
  private storageService = inject(StorageService);
  private dialog = inject(MatDialog);
  public readonly users$ = this.usersService.users$

  dialogOpen = false;
  user!: User;
  data!: User;  

  constructor(){}

  ngOnInit(): void {
    if(this.storageService.getItem() === null) {
      this.usersService.loadUsers()
    } else {
      this.usersService.loadStoredData()
    }
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
