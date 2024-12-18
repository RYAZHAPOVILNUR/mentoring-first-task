import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogClose} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

}
