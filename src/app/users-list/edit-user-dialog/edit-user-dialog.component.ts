import { Component } from "@angular/core";
import { inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { User } from "../users-list.component";

@Component({
  standalone: true,
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule,MatDialogClose]
  
})
export class EditUserDialogComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA)
    
  public form = new FormGroup({
    name: new FormControl( this.data.user.name, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
    website: new FormControl(this.data.user.website, [
      Validators.required,
       Validators.minLength(3),
      ]),
    companyName: new FormControl(this.data.user.company.name, [
      Validators.required,
       Validators.minLength(2) ]),
    });


    get userWithUpdatedFields() {
      return{
        ...this.form.value,
        id: this.data.user.id,
      };
    }

}