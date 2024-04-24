import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersType } from '../../shared/types/users-types.type';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UsersListModalWindowComponent } from '../users-list-modal-window/users-list-modal-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})

export class UserCardComponent {
  constructor(public dialog: MatDialog) { }

  @Input()
  user?: UsersType

  @Output()
  deleteEvent = new EventEmitter<number>();

  deleteCard(id: number) {
    this.deleteEvent.emit(id);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    redact: boolean,
    id: number): void {
    this.dialog.open(UsersListModalWindowComponent,
      {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { redact, id }
      }
    )
  }

}
