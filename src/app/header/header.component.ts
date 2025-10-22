import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

const aboutCompanyFn = (title: string) => title;
const aboutCompanyy: string = aboutCompanyFn('О компании');
const menuItems = ['Каталог','Стройматериалы','Инструменты','Электрика','Интерьер и одежда'];

const upperCaseMenuItems = menuItems.map((item) => {
  return item.toUpperCase();
});

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgIf, NgFor],
  styleUrl: './header.component.scss',
})

export class HearderComponent {
  readonly headerItem1 = 'Главная';
  readonly aboutCompany = aboutCompanyy;
  readonly headerItem3 = 'Католог';
  isShowCatalog: boolean = true;
  readonly header2Item1 = upperCaseMenuItems[0];
  menuItems = upperCaseMenuItems;
  isUpperCase = true;
  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map((item) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase());
    this.isUpperCase = !this.isUpperCase;
  }
}