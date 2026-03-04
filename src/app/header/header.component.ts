import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CartDirective } from '../directives/cart.directive';

const aboutCompanyFn = (title: string) => title;
const aboutCompanyy: string = aboutCompanyFn('О компании');
const menuItems: string[] = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];

const upperCaseMenuItems: string[] = menuItems.map((item: string) => {
  return item.toUpperCase();
});

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, CartDirective],
  styleUrl: './header.component.scss',
})
export class HearderComponent {
  today: number = Date.now();
  readonly headerItem1: string = 'Главная';
  readonly aboutCompany: string = aboutCompanyy;
  readonly headerItem3: string = 'Католог';
  isShowCatalog: boolean = true;
  readonly header2Item1: string = upperCaseMenuItems[0];
  menuItems: string[] = upperCaseMenuItems;
  isUpperCase: boolean = true;
  changeMenuText(): void {
    this.menuItems = upperCaseMenuItems.map((item: string) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase(),
    );
    this.isUpperCase = !this.isUpperCase;
  }
}
