import {Component, Inject, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {User} from "../users-list.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LocalstorageService} from "../../../services/localstorage.service";
// import * as console from "node:console";

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule,
        MatDialogClose,
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel
    ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);


  public form = new FormGroup({
      name: new FormControl(this.data.user?.name,[Validators.required,Validators.minLength(2)]),
      email: new FormControl(this.data.user?.email,[Validators.required,Validators.email]),
      website: new FormControl(this.data.user?.website,[Validators.required,Validators.minLength(3)]),
      companyName: new FormControl(this.data.user?.company.name,[Validators.required,Validators.minLength(2)]),
      phone: new FormControl(this.data.user?.phone,[Validators.required,Validators.pattern('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')])
    }
  )

  get fullInfoField() {
    console.log(this.data)
    return {
      id: this.data.user?.id,
    ...this.form.value
    }
  }

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message,action);
  }
}
