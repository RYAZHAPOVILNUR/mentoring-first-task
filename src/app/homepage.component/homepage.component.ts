import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

 const newPages = [1,2,3,4,5];

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrl: './homepage.component.scss',
  imports: [NgFor]
})

export class HomepageComponent {
  readonly newPages: number[] = newPages; 
}
