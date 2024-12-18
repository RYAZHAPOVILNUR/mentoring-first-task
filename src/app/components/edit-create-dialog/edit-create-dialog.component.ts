import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-create-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButton,
    NgIf,
    MatDialogClose
  ],
  templateUrl: './edit-create-dialog.component.html',
  styleUrl: './edit-create-dialog.component.scss'
})
export class EditCreateDialogComponent {
  builder: FormBuilder = inject(FormBuilder);
  data = inject(MAT_DIALOG_DATA);
  constructor() {
    this.form.patchValue({name: this.data.user?.name,
    email: this.data.user?.email,
    website: this.data.user?.website,
    phone: this.data.user?.phone,});
  }

  public form = this.builder.group({
    name: this.builder.control('', [Validators.required]),
    email: this.builder.control('', [Validators.required]),
    website: this.builder.control('', [Validators.required]),
    phone: this.builder.control('', [Validators.required]),
  })


  get infoFullFields(){
    return this.form.value;
  }
}
