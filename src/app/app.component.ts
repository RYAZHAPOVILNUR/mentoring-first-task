import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserList } from '../app/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateEditCard } from './create-edit-component/create-edit-card.component';
import { User } from './user.model'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserList, HttpClientModule, CreateEditCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'title';
  currentUser: User | undefined;
}
