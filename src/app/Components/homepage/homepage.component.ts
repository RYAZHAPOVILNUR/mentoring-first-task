import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgIf],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  public showImageCar = true;
}
