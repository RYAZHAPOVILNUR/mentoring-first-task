import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mentoring-first-project';

  private readonly router = inject(Router);

  goToUsers(): void {
    this.router.navigate(['/users']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
  goToTodos(): void {
    this.router.navigate(['/todos']);
  }
}
