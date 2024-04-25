import { Component, Inject, inject } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import {
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatDialogClose
} from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { IUser } from '../../interface/user.interface'
import { UsersFormService } from '../../services/users-form.service'

@Component({
	selector: 'app-create-edit-user',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatInputModule,
		MatButtonModule,
		MatDialogClose
	],
	templateUrl: 'create-edit-user.component.html'
})
export class CreateEditUserComponent {
	public userForm: FormGroup
	private readonly dialogRef = inject(MatDialogRef)
	public usersFormService = inject(UsersFormService)

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public readonly user: IUser
	) {
		this.userForm = this.usersFormService.createUserForm(user)
	}

	onSubmit(): void {
		this.dialogRef.close(this.userForm.value)
	}
}
