import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../../models/user.interface";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
})

export class UserCardComponent {
  @Input() user: User;
  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<User>();

  readonly dialog = inject(MatDialog);


  public onDeleteUser(): void {
    this.deleteUser.emit(this.user.id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editUser.emit(result);
      }
    });
  }
}
