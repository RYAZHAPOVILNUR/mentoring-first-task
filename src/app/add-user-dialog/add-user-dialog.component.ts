import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})

export class AddUserDialogComponent {
  fb = inject(FormBuilder);
  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    mail: ['', Validators.required]
  })
  constructor() {}
}
