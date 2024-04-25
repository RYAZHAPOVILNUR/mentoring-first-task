import { Component, inject } from '@angular/core'
import { UserFacade } from '../users/lib/+state/users.facade'
import { AsyncPipe } from '@angular/common'

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [AsyncPipe],
	templateUrl: './home.component.html'
})
export class HomeComponent {
	userFacade = inject(UserFacade)
}
