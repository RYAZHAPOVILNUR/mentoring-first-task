import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from '../../../../core/pipes/custom-data.pipe';
import { MaterialModule } from '../../../../shared/_module/Material.Module';
import { AddMaterialIconComponent } from './add-material-icon/add-material-icon.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialInfoComponent } from '../../materials-add-folder/material-info/material-info.component';
import { MaterialType } from '../../../../shared/types/materials-types.type';
import { Store } from '@ngrx/store';
import { deleteMaterial, loadMaterials } from '../../../../core/state/material/materials/materials.actions';
import { getMaterialList } from '../../../../core/state/material/materials/materials.selector';

@Component({
  selector: 'app-materials-folder',
  standalone: true,
  imports: [CommonModule, CustomDatePipe, MaterialModule, AddMaterialIconComponent],
  templateUrl: './materials-folder.component.html',
  styleUrl: './materials-folder.component.scss'
})
export class MaterialsFolderComponent implements OnInit {

  id: number;
  materials: MaterialType[] = []

  constructor(
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.id = activateRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getMaterial(this.id)
  }
  getMaterial(idFolder: number) {
    this.store.dispatch(loadMaterials())
    this.store.select(getMaterialList).subscribe(data => {
      let filterData = data.filter(elem => elem.folder_id == idFolder)
      this.materials = filterData
    }
    )
  }

  removeMaterial(materialId: number) {
    this.store.dispatch(deleteMaterial({ id: materialId }))
  }

  openMaterial(materialId: number) {
    const dialogRef = this.dialog.open(MaterialInfoComponent, { width: '80%', height: '90%', data: { materialId: materialId } });
    dialogRef.afterClosed().subscribe();

  }

}
