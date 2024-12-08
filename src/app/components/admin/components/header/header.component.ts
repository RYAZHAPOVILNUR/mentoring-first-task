import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'mentoring-first-project';
  showCompany = true;
  readonly header1 = 'О компании';

  constructor(private authService: AuthService) {
  }

  logout(){
    this.authService.logout()
  }
}
