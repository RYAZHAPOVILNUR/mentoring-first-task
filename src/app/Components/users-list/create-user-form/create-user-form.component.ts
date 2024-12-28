import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateUserFormDialogComponent} from "../create-user-form-dialog/create-user-form-dialog.component";
import {IUserCreate} from "../../../Interfaces/IUser";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  private readonly dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  @Output()
  public createUser: EventEmitter<IUserCreate> = new EventEmitter<IUserCreate>();

  public openCreateDialog(): void {

    const dialogRef: MatDialogRef<CreateUserFormDialogComponent> = this.dialog.open(CreateUserFormDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: IUserCreate): void => {
      if (result) {
        this.createUser.emit(result);
        // console.log('если result true, передаем эти данные:', result)
        this.snackBar.open('Юзер создан!', 'Ok', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Отмена создания!', 'Ok', {
          duration: 3000
        });
      }
    });
  }
}
