import { Injectable, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IUser } from '../interface/user.interface'

@Injectable({
	providedIn: 'root'
})
export class UsersFormService {
	private readonly fb = inject(FormBuilder)

	public createUserForm(user: IUser): FormGroup {
		return this.fb.group({
			name: [user?.name ?? '', Validators.required],
			email: [user?.email ?? '', [Validators.required, Validators.email]],
			username: [user?.username ?? '', Validators.required]
		})
	}
}
