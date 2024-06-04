import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { IUser } from "../../user";

@Component({
    selector: 'create-edit-user',
    templateUrl: 'create-edit-user.component.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
})

export class CreatEditUser {
    constructor(@Inject(MAT_DIALOG_DATA) public user: IUser,
        private dialogRef: MatDialogRef<CreatEditUser>) {
        this.myForm = new FormGroup({
            "name": new FormControl("", [Validators.required]),
            "username": new FormControl("", [Validators.required]),
            "email": new FormControl("", [
                Validators.required,
                Validators.email
            ]),
            "phone": new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")] )
        })
    }

    myForm: FormGroup;

    submit() {
        this.dialogRef.close({ data: this.myForm.value })
    }

}


