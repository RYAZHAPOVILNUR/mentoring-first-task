import { Component, inject, OnInit } from "@angular/core";
import { User } from "../../models/user.interface";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class CreateEditUserComponent implements OnInit {
  public readonly data: User = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<CreateEditUserComponent>);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  ngOnInit(): void {
    if (this.data) {
      this.form.setValue({
        name: this.data.name || '',
        username: this.data.username || '',
        email: this.data.email || '',
        companyName: this.data.company?.name || ''
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.formWithFields);
    }
  }

  get formWithFields(): User {
    return {
      id: this.data?.id || new Date().getTime(),
      name: this.form.value.name!,
      username: this.form.value.username!,
      email: this.form.value.email!,
      address: {
        street: this.data?.address?.street || "",
        suite: this.data?.address?.suite || "",
        city: this.data?.address?.city || "",
        zipcode: this.data?.address?.zipcode || "",
        geo: {
          lat: this.data?.address?.geo?.lat || "",
          lng: this.data?.address?.geo?.lng || ""
        }
      },
      phone: this.data?.phone || "",
      website: this.data?.website || "",
      company: {
        name: this.form.value.companyName!,
        catchPhrase: this.data?.company?.catchPhrase || "",
        bs: this.data?.company?.bs || ""
      }
    };
  }
}
