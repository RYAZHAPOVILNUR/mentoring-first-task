import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'mentoring-first-project';
  showCompany = true;
  readonly header1 = 'О компании';
}
