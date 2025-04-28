import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { miniUser, User } from '../../interface/user.interface';
import { UsersApiService } from '../../services/users-api.service';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/user.actions';
import { selectUsers } from './store/users.selectors';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule, NgFor, UserCardComponent, AsyncPipe, MatButtonModule, 
    MatIconModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
	readonly usersApiService = inject(UsersApiService);
	private readonly store = inject(Store);
	public readonly users$ = this.store.select(selectUsers);
	private dialog = inject(MatDialog);
	private snackBar = inject(MatSnackBar);

  	constructor() {
		this.usersApiService.getUsers().subscribe((response: any) => {
			this.store.dispatch(UsersActions.set({ users: response }));
		})
  	}
	
  	openCreateDialog() {
    	const dialogRef = this.dialog.open(CreateUserDialogComponent, {});

 	 	dialogRef.afterClosed().subscribe((createResult: miniUser | undefined) => {
    		if (createResult) {
      			this.createUser(createResult);
        		this.snackBar.open('Пользователь создан', 'Ок', {
          			duration: 3000,
      			});
    		} else if (createResult === false) {
        		this.snackBar.open('Пользователь не создан', 'Закрыть', {
          			duration: 3000,
        		});
    		};
  		});

    	const buttonElement = document.activeElement as HTMLElement;
    	buttonElement.blur();
  	}

	deleteUser(id: number) {
		this.store.dispatch(UsersActions.delete({ id }));
	}

	editUser(formDialogValue: User) {
		this.store.dispatch(UsersActions.edit({ user: formDialogValue }));
	}

	createUser(formData: miniUser) {
		this.store.dispatch(
			UsersActions.create({
				user: {
					id: new Date().getTime(),
					name: formData.name,
					email: formData.email,
					website: formData.website,
					company: {
						name: formData.company.name,
					},
				},
			})
		);
	}
}
