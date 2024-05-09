import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./shared/component/navigation/navigation.component";
import { HeaderComponent } from "./shared/component/header/header.component";
import { FooterComponent } from "./shared/component/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AppComponent {
  title = 'my-first-project';
}
