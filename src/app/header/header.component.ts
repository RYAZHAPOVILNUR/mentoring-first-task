import { NgFor, NgIf } from '@angular/common';
import { TemplateLiteral } from '@angular/compiler';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [ RouterOutlet, NgFor, NgIf],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })




// const MenuItems : string[] = ['Каталог','Стройматериалы','Инструменты','Электрика','Интерьер и одежда'] 
// const upperCaseMenuItems = .map(
//   (item) =>{
//     return item.toUpperCase();
//   }
// )

// console.log(upperCasemenuitems)

// const newpages = [5,4,3,2,1]
 


export class HeaderComponent {
  title = 'githab';

 isShowCatalog = true;

  readonly headeritem1 = 'Home';
  readonly headeritem2 = 'About Company';
  readonly headeritem3 = 'Catalog';
  readonly headeritem4 = 'Users';
  readonly headeritem5 = 'todos';
  isShowImg :boolean = true

  // readonly header2item1 = upperCasemenuitems[0];
  // readonly header2item2 = upperCasemenuitems[1];
  // readonly header2item3 = upperCasemenuitems[2];
  // readonly header2item4 = upperCasemenuitems[3];
  // readonly header2item5 = upperCasemenuitems[4];
  // menuitem = upperCasemenuitems
  // readonly newpages = newpages;
  // // menuitems : string[] = upperCasemenuitems


 
}
 




