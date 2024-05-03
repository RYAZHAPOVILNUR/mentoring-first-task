import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
