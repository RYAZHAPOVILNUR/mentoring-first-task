import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UsersListComponent } from "./users-list/users-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, UsersListComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mentoring-first-project';
  headerItem1 = 'Главная';
  headerItem2 = 'О компании';
  headerItem3 = 'Каталог';
  isShowCatalog = true;
  isUpperCase = false;

  upperCaseMenuItems = [
    'Главная',
    'О компании',
    'Каталог',
    'Контакты',
    'Помощь',
  ];

   get menuItems(){
      return this.isUpperCase ? this.upperCaseMenuItems.map(item => item.toUpperCase()) : this.upperCaseMenuItems
  }


}
