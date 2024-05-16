import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/_module/Material.Module';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../materials-add-folder.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-folderr',
  standalone: true,
  imports: [MaterialModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './add-folderr.component.html',
  styleUrl: './add-folderr.component.scss'
})
export class AddFolderComponent {

  folderName: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      folderName: string;
    },
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
