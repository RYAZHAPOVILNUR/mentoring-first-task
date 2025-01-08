import {
  Component,
  inject
} from '@angular/core';
import { IUser } from '../../../Interfaces/IUser';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatIcon
  ],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
  public readonly data: { user: IUser } = inject<{ user: IUser }>(MAT_DIALOG_DATA);
}
