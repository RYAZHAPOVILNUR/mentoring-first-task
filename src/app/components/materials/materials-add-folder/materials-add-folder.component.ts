import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/_module/Material.Module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFolderComponent } from './add-folderr/add-folderr.component';
import { Store } from '@ngrx/store';
import { addFolder, loadFolders } from '../../../core/state/material/folders/folders.actions';
import { getFolderList } from '../../../core/state/material/folders/folders.selector';
import { FolderType } from '../../../shared/types/materials-types.type';

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
    public dialog: MatDialog,
    private store: Store
  ) { }


  addFolder(folderName: string) {
    this.store.dispatch(addFolder({ inputdata: folderName }));
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