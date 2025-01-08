import { Component } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatToolbarModule, MatButtonModule],
})
export class Header{
}