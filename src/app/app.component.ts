import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DatePipe, NgIf} from "@angular/common";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {HeaderComponent} from "./components/header/header.component";
import {TodoListComponent} from "./components/todo-list/todo-list.component";





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, UsersListComponent, HeaderComponent, TodoListComponent, DatePipe, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public date = Date.now();
  updateDate(){
    return Date.now();
  }
  protected readonly setInterval = setInterval;
  protected readonly Date = Date;
}
