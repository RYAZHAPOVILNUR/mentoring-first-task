import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UsersBackType } from '../../../shared/types/users-backend.type';
import { UsersBackModalWindowComponent } from '../users-list-modal-window/users-back-modal-window.component';
import { UsersBackendService } from '../../../core/services/backend-users/users-backend.service';

@Component({
  selector: 'app-back-user-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './user-back-card.component.html',
  styleUrl: './user-back-card.component.scss'
})

export class UserBackCardComponent {
  updateUser() {
    this.usersBackendService.updateBackUser(this.user!.id, {
      "name": "string",
      "email": "user@example.com",
      "username": "string",
      "city": "string",
      "role": "admin",
      "purchaseDate": "string",
      "educationStatus": "trainee",
      "educationTime": 0,
      "totalStoryPoints": 0,
      "teams_id": 0,
      "photo": {
        "access": "public",
        "path": "https://prorisuem.ru/foto/8684/mini_risunki_dlia_srisovki_1.webp",
        "name": "string",
        "type": "string",
        "size": 0,
        "mime": "string",
        "meta": {}
      }
    }
    ).subscribe(data => console.log(data)
    )
  }
  @Input()
  user?: UsersBackType

  @Output()
  deleteEvent = new EventEmitter<number>();

  constructor(public dialog: MatDialog, private usersBackendService: UsersBackendService) { }

  deleteCard(id: number) {
    // this.deleteEvent.emit(id);
  }


  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    userId: number
  ): void {
    this.dialog.open(UsersBackModalWindowComponent,
      {
        width: '300px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { userId }
      }
    )
  }
}
