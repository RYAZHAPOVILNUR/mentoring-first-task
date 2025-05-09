import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [NgFor, NgIf],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  standalone: true,
})
export class MainComponent {
  
  switchNumbers = [1, 2, 3, 4, 5];

  switchFunction() {
    return this.switchNumbers.slice().reverse();
  }
  
}
