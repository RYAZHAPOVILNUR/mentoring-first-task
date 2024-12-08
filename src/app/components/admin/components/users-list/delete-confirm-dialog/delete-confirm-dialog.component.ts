import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatDialogClose} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {MatCardActions} from "@angular/material/card";

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogClose,
    MatButton,
    MatCardActions
  ],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss'
})
export class DeleteConfirmDialogComponent {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message,action);
  }
}
