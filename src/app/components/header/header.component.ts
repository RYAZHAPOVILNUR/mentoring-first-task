import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежа' ];

// console.log (menuItems);
const menuCatalog = menuItems.map (
  (item) => {
    return item.toUpperCase();
  }
)


@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [RouterLink, NgFor, NgIf],
})

export class HeaderComponent {

  isShowCatalog = true;

  readonly headeritem1 = 'Главная';

  readonly headeritem2 = 'О компании';

  readonly headeritem3 = 'Каталог';


  readonly header2item1 = 'Каталог';

  readonly header2item2 = 'Стройматериалы';

  readonly header2item3 = 'Инструменты';

  readonly header2item4 = 'Электрика';

  readonly header2item5 = 'Интерьер и одежда';

  menuCatalog = true; 

  menuItems = menuCatalog

  
  
  changeMenuText () {
    this.menuItems = menuCatalog.map(
      item => this.menuCatalog ? item.toLowerCase() : item.toUpperCase()
    );

    this.menuCatalog = ! this.menuCatalog
  }
  
}