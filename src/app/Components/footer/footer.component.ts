import {Component} from '@angular/core';
import {NgFor} from "@angular/common";

const menuItems: string[] = ['Главная', 'О компании', 'Каталог', 'Запчасти', 'Интерьер', 'Стиль', 'Партнеры'];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public readonly menuItems: string[] = menuItems;
}
