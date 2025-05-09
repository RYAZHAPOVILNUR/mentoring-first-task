import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { YellowDirective } from "../../directives/yellow.directive";
import { AdminAuthComponent } from "../../auth/admin.component";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [RouterLink, NgFor, NgIf, YellowDirective, AdminAuthComponent],
})

export class HeaderComponent{
    
    isShowCatalog = true;
    isUpperCase = false;
    menuItems = [
      'Каталог',
      'Стройматериалы',
      'Инструменты',
      'Электрика',
      'Интерьер и одежда',
    ];
    
    switchNumbers = [1,2,3,4,5];
    
    switchFunction() {
      return this.switchNumbers.slice().reverse();
    }
    
}