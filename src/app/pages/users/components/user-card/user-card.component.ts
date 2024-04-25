import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IUser } from '../../interface/user.interface'
import { TitleCasePipe } from '@angular/common'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [TitleCasePipe, MatCardModule, MatButtonModule],
	templateUrl: './user-card.component.html'
})
export class UserCardComponent {
	@Input({ required: true }) user!: IUser
	@Output() deleteUserEvent = new EventEmitter<number>()
	@Output() openEditUserDialogEvent = new EventEmitter<IUser>()

	deleteUser(): void {
		this.deleteUserEvent.emit()
	}

	openEditUserDialog(): void {
		this.openEditUserDialogEvent.emit()
	}
}
