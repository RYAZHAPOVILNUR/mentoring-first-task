import { Component, OnInit } from '@angular/core';
import { MaterialElementComponent } from './material-element/material-element.component';
import { CommonModule } from '@angular/common';
import { MaterialsAddFolderComponent } from './materials-add-folder/materials-add-folder.component';
import { FolderService } from '../../core/services/folders-api-service.service';
import { FolderType } from '../../shared/types/materials-types.type';
import { Store } from '@ngrx/store';
import { getFolderList } from '../../core/state/material/folders/folders.selector';
import { loadFolders } from '../../core/state/material/folders/folders.actions';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [MaterialElementComponent, MaterialsAddFolderComponent, CommonModule],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss'
})
export class MaterialsComponent implements OnInit {
  folders: FolderType[] = []

  constructor(
    private store: Store,
  ) { }


  ngOnInit(): void {
    this.getFoldersForList()
  }

  getFoldersForList() {
    this.store.dispatch(loadFolders())
    this.store.select(getFolderList).subscribe(data => this.folders = data)
  }
}
