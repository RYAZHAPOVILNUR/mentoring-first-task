import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { User } from '../../../shared/interfaces/user.interface';
import { CreateEditUserComponent } from '../../dialog/create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  public readonly usersService = inject(UsersService);
  private readonly dialog = inject(MatDialog);
  public users$ = this.usersService.users$;
  
  ngOnInit(): void {
    this.usersService.loadInitialUsers();
  }

  public deleteUser(userToDelete: User): void {
    this.usersService.deleteUser(userToDelete.id);
  }

  public openAddUserDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '30%',
      data: { user: null, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.usersService.addUser(newUser);
      }
    })
  }

  public openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '30%',
      data: {user, isEdit: true }
    })

    dialogRef.afterClosed().subscribe(editUser => {
      if (editUser) {
        this.usersService.editUser(editUser);
      }
    })
  }
  

























    
  // UsersService
  // public users: User[];
  // public obj: string = 'title';

  // public onDeleteUser(userId: number): void {
  //   this.usersService.deleteUser(userId);
  //   this.users = this.usersService.getUsers();
  // }

  // public onEditUser(user: any): void {
  //   this.usersService.editUser(user);

  //   const dialogRef = this.dialog.open(EditUserComponent, {
  //     width: '250px',
  //     data: { user: user }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.usersService.editUser(result).subscribe({
  //         next: (res: any) => {
  //           console.log('пользователь обновлен', res)
  //         },
  //         error: (err: any) => {
  //           console.log('ошибка при обновлений пользователя', err)
  //         }
  //       })
  //     }
  //   });
  // } 

  // // MatDialog
  // public polzovatels: Polzovatel[] = [];

  // public openAddUserDialog(polzovatel?: Polzovatel): void {
  //   const dialogRef = this.dialog.open(CreateEditUserComponent, {
  //     width: '250px',
  //     data: polzovatel ? polzovatel : null // Передаем пользователя, если редактируем, иначе ничего
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       if (polzovatel) {
  //         // Редактирование пользователя
  //         const index = this.polzovatels.findIndex(u => u === polzovatel);
  //         this.polzovatels[index] = result;
  //       } else {
  //         // Добавление нового пользователя
  //         this.polzovatels.push(result);
  //       }
  //     }
  //     // Добавьте логику добавления пользователя здесь
  //   });
  // }

}
