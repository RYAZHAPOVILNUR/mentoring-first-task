import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';
}
