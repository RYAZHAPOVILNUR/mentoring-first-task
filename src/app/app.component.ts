import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserCardComponent} from "./components/user-card/user-card.component";
import {UserListComponent} from "./components/user-list/user-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, UserCardComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';
}
