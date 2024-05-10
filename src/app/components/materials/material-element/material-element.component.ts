import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../shared/_module/Material.Module';
import { FolderType } from '../../../shared/types/folders-types.type';
import { CustomDatePipe } from '../../../core/pipes/custom-data.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-element',
  standalone: true,
  imports: [MaterialModule, CustomDatePipe],
  templateUrl: './material-element.component.html',
  styleUrl: './material-element.component.scss'
})
export class MaterialElementComponent {
  @Input() folder!: FolderType

  constructor(private router: Router) { }

  goToFolder(folderId: number) {
    this.router.navigate(['materials/folder/' + folderId])
  }
}
