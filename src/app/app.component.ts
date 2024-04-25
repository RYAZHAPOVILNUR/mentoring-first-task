import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { UsersApi } from './pages/users/services/users-api.service'
import { HeaderComponent } from './layout/header/header.component'
import { FooterComponent } from './layout/footer/footer.component'

@Component({
	selector: 'app-root',
	standalone: true,
	providers: [],
	imports: [RouterOutlet, HeaderComponent, FooterComponent],
	templateUrl: './app.component.html'
})
export class AppComponent {
	private readonly usersApi = inject(UsersApi)
}
