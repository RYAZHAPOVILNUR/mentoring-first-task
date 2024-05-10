import { Component, OnInit } from '@angular/core';
import { MaterialElementComponent } from './material-element/material-element.component';
import { CommonModule } from '@angular/common';
import { MaterialsAddFolderComponent } from './materials-add-folder/materials-add-folder.component';
import { FolderService } from '../../core/services/folders-api-service.service';
import { FolderType } from '../../shared/types/folders-types.type';

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
    private service: FolderService
  ) { }

  ngOnInit(): void {
    this.getFolders()
  }

  getFolders() { this.service.getAllFolders().subscribe(data => this.folders = data) }

}
