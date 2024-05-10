import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/_module/Material.Module';

@Component({
  selector: 'app-materials-add-folder',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './materials-add-folder.component.html',
  styleUrl: './materials-add-folder.component.scss'
})
export class MaterialsAddFolderComponent {

  addElement() {
    alert(123)
  }
}
