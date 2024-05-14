import { Component, Inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialService } from '../../../../../../core/services/materials-api-service.service';
import { FileType } from '../../../../../../shared/enums/file-type.enum';
import { Store } from '@ngrx/store';
import { addMaterial } from '../../../../../../core/state/material/materials/materials.actions';

@Component({
  selector: 'app-add-material-form',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-material-form.component.html',
  styleUrl: './add-material-form.component.scss'
})
export class AddMaterialFormComponent {
  formTitle: string = ''
  title = new FormControl('', [Validators.required]);
  link = new FormControl('', [Validators.required]);
  folderId: number = 0
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { folderId: number, dataType: FileType },
    private store: Store
  ) {
    if (data.dataType === FileType.PDF) {
      this.formTitle = 'Add pdf'
    }
    else if (data.dataType === FileType.VIDEO) {
      this.formTitle = 'Add video'
    }
    else if (data.dataType === FileType.MP3) {
      this.formTitle = 'Add MP3'
    }
    merge(this.title.statusChanges, this.title.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  addMaterial() {
    if (this.link.value && this.title.value) {
      const newMaterial = {
        "title": this.title.value,
        "material_link": this.link.value,
        "folder_id": this.data.folderId
      }
      this.store.dispatch(addMaterial({ inputdata: newMaterial }))
    }
  }


  updateErrorMessage() {
    if (this.title.hasError('required') || this.link.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else {
      this.errorMessage = '';
    }
  }
}
