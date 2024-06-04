import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { IUser } from "../../user";
import { NgIf } from "@angular/common";

@Component({
    selector: 'create-edit-user',
    templateUrl: 'create-edit-user.component.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule, NgIf],
})

export class CreatEditUser {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IUser,
        private dialogRef: MatDialogRef<CreatEditUser>) {
        this.myForm = new FormGroup({
            "name": new FormControl("", [Validators.required]),
            "username": new FormControl("", [Validators.required]),
            "email": new FormControl("", [
                Validators.required,
                Validators.email
            ]),
            "phone": new FormControl("", [Validators.required]),
            "id": new FormControl("")
        })
        this.myForm.patchValue(data);
    }

    myForm: FormGroup;

    submit() {
        this.dialogRef.close({ data: this.myForm.value })
    }

}


