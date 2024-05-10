import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../shared/_module/Material.Module';
import { FolderService } from '../../../core/services/folders-api-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFolderComponent } from './add-folderr/add-folderr.component';

@Component({
  selector: 'app-materials-add-folder',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './materials-add-folder.component.html',
  styleUrl: './materials-add-folder.component.scss'
})
export class MaterialsAddFolderComponent {
  folderName: string = '';

  constructor(
    private service: FolderService,
    public dialog: MatDialog
  ) { }

  addFolder(folderName: string) {
    this.service.addFolder(folderName).subscribe(data => console.log(data))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFolderComponent, {
      data: { name: this.folderName },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFolder(result)
      }
    });
  }
}


export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      animal: string;
      name: string;
    },
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}