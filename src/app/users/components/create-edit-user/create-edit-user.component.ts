import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from "../../modules/interfaces/user.interface";

@Component({
    selector: 'app-create-edit-user',
    standalone: true,
    imports: [
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        ReactiveFormsModule
    ],
    templateUrl: './create-edit-user.component.html',
    styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent {
    constructor(
        private dialogRef: MatDialogRef<CreateEditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; user: User },
    ) {
        if (this.data.isEdit) {
            this.myFormGroup.patchValue(this.data.user);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    readonly myFormGroup = new FormGroup({
        id: new FormControl(new Date().getTime(), Validators.required),
        name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required])
    });
}