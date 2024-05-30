import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        MatButton,
        RouterLink,
    ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss',],
})
export class HomePageComponent {

}
