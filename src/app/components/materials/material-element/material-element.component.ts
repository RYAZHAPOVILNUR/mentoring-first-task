import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../shared/_module/Material.Module';
import { CustomDatePipe } from '../../../core/pipes/custom-data.pipe';
import { Router } from '@angular/router';
import { FolderType } from '../../../shared/types/materials-types.type';
import { Store } from '@ngrx/store';
import { deleteFolder } from '../../../core/state/material/folders/folders.actions';

@Component({
  selector: 'app-material-element',
  standalone: true,
  imports: [MaterialModule, CustomDatePipe],
  templateUrl: './material-element.component.html',
  styleUrl: './material-element.component.scss'
})
export class MaterialElementComponent {

  @Input() folder!: FolderType

  constructor(private router: Router, private store: Store) { }

  goToFolder(folderId: number) {
    this.router.navigate(['materials/folder/' + folderId])
  }

  removeFolder(folderId: number) {
    this.store.dispatch(deleteFolder({ id: folderId }))
  }
}
