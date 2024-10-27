import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

function returnNameMenu(name: string) {
  return name
};

const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']

const nameMenu1 = returnNameMenu('О компании');

const newPages = [5, 4, 3, 2, 1]


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent {
  title = 'mentoring-first-project';

  isShowCatalog = true;

  isShowPromo = true;

  isUpperCase = false;

  readonly headerItem1 = 'Главная';

  readonly aboutCompany = nameMenu1;

  readonly headerItem3 = 'Каталог';

  readonly headerLowItem1 = 'Каталог';
  
  readonly headerLowItem2 = 'Стройматериалы';

  readonly headerLowItem3 = 'Инструменты';

  readonly headerLowItem4 = 'Электрика';

  readonly headerLowItem5 = 'Интерьер и одежда';

  readonly newPages = newPages;

  menuItems = menuItems

  changeMenuText() {
    this.menuItems = menuItems.map(
      item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )

    this.isUpperCase = !this.isUpperCase
  }

}
