import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {UserInterface} from "../types/user.interface";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {CreateEditUser} from "../create-edit-user/create-edit-user";

import {
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: UserInterface;
  @Output() onDeleteUser = new EventEmitter<number>();

  constructor() {}

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(CreateEditUser, {
      data: {
        id: this.user.id,
        name: this.user.username,
        company: this.user.company?.name,
        website: this.user.website,
        phone: this.user.phone,
      },
    });
  }

  deleteUser() {
    this.onDeleteUser.emit(this.user.id)
  }

}
