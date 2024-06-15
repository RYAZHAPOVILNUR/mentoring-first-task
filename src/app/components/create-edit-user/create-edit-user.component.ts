import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

import { IUser } from "../../user";

@Component({
  selector: "create-edit-user",
  templateUrl: "create-edit-user.component.html",
  styleUrls: ["create-edit-user.component.css"],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, NgIf],
})
export class CreatEditUser {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private dialogRef: MatDialogRef<CreatEditUser>
  ) {
    this.myForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      id: new FormControl(""),
    });
    this.myForm.patchValue(data);
  }

  myForm: FormGroup;

  submit() {
    this.dialogRef.close({ data: this.myForm.value });
  }
}
