import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UsersType } from '../../../../shared/types/users-types.type';
import { UsersListModalWindowComponent } from '../../users-list-modal-window/users-list-modal-window.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})

export class UserCardComponent {
  @Input()
  user?: UsersType

  @Output()
  deleteEvent = new EventEmitter<number>();

  constructor(public dialog: MatDialog) { }

  deleteCard(id: number) {
    this.deleteEvent.emit(id);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    redact: boolean,
    id: number
  ): void {
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
