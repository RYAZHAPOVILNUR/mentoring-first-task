import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppFooterComponent } from './app-footer/app-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AppHeaderComponent, AppMainComponent, AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit() { }
}
