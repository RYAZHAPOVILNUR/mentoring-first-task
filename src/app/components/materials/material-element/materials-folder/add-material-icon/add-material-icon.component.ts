import { Component, Input, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../../shared/_module/Material.Module';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddMaterialFormComponent } from './add-material-form/add-material-form.component';
import { ActivatedRoute } from '@angular/router';
import { FileType } from '../../../../../shared/enums/file-type.enum';

@Component({
  selector: 'app-add-material-icon',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './add-material-icon.component.html',
  styleUrl: './add-material-icon.component.scss'
})
export class AddMaterialIconComponent {
  folderId: any
  FileType = FileType

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.folderId = this.activatedRoute.snapshot.params["id"]
  }


  openDialog(id: number, fileType: FileType) {
    const dialogRef = this.dialog.open(AddMaterialFormComponent, { restoreFocus: false, data: { folderId: id, dataType: fileType } });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

}
