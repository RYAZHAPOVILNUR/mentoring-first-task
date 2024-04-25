import { Component, OnInit, inject } from '@angular/core'
import { UsersService } from './services/users.service'
import { CommonModule } from '@angular/common'
import { IUser } from './interface/user.interface'
import { UserCardComponent } from './components/user-card/user-card.component'
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
	selector: 'app-user-list',
	standalone: true,
	imports: [
		UserCardComponent,
		MatGridListModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		FormsModule,
		CommonModule
	],
	templateUrl: './users-list.component.html'
})
export class UserListComponent implements OnInit {
	private readonly dialog = inject(MatDialog)
	public readonly usersService = inject(UsersService)

	openAddUserDialog(): void {
		const dialogRef = this.dialog.open(CreateEditUserComponent, {
			disableClose: true
		})

		dialogRef.afterClosed().subscribe(userFormData => {
			if (userFormData) {
				this.usersService.addUser(userFormData)
			}
		})
	}

	openEditUserDialog(user: IUser): void {
		const dialogRef = this.dialog.open(CreateEditUserComponent, {
			disableClose: true,
			data: user
		})

		dialogRef.afterClosed().subscribe(userFormData => {
			if (userFormData) {
				this.usersService.editUser(user, userFormData)
			}
		})
	}

	ngOnInit(): void {
		this.usersService.getUsers().subscribe()
	}
}
