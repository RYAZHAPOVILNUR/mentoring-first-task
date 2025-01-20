import { NgFor, NgIf } from "@angular/common";
import { Component, isStandalone } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";


const aboutCompani = (text: string) => console.log(text);

aboutCompani('О компании');

const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']

const upperCaseMenuItems = menuItems.map (
  (item) => {
    return item.toUpperCase();
  }
)

// const upperCaseNames = names.map (
//   (name) => {
//     console.log(name.toUpperCase());
//     return name.toUpperCase();
//   }
// )



@Component({
  selector:'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  isShowCatalog = true;

  readonly aboutCompany = 'О компании'

  readonly isUpperCaseMenu = upperCaseMenuItems;

  readonly headerItem1 = 'Главная';

  readonly headerItem2 = 'О компании';

  readonly headerItem3 = 'Каталог';

  readonly headerItem4 = 'Пользователи'

  readonly headerItem5 = 'Todos'

  readonly header2Item1 = 'Каталог';

  readonly header2Item2 = 'Стройматериалы';

  readonly header2Item3 = 'Инструменты';

  readonly header2Item4 = 'Электрика';

  readonly header2Item5 = 'Интерьер и одежда';

  menuItems = upperCaseMenuItems;

  isUpperCase = false;

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map(
      item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase ()
    )
  this.isUpperCase = !this.isUpperCase
  }
}
