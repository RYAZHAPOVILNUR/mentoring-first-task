import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="user-card" (click)="onCardClick()">
      <mat-card-header>
        <mat-card-title>{{ user.name }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Username:</strong> {{ user.username }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="warn" (click)="onDelete($event)">
          Удалить
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .user-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .user-card:hover {
      transform: translateY(-5px);
    }
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      padding: 16px;
    }
  `]
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<number>();

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.user.id);
  }

  onCardClick(): void {
    // Событие клика обрабатывается в родительском компоненте
  }
}
