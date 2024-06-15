import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { IUser } from "../../user";

@Component({
  selector: "user-card",
  standalone: true,
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.css"],
  imports: [MatCardModule, MatButtonModule],
})
export class UserCard {
  @Input() user!: IUser;

  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onOpenEditDialog: EventEmitter<any> = new EventEmitter();

  onDeleteUser(id: number) {
    this.onDelete.emit(id);
  }

  openEditDialog(user: IUser) {
    this.onOpenEditDialog.emit(user);
  }
}
