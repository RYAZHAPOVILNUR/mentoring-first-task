import {ChangeDetectionStrategy, Component, inject, Inject, Input, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {Store} from "@ngrx/store";
import {createUser, updateUser} from "../store/users.actions";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './create-edit-user.html',
  styleUrl: './create-edit-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CreateEditUser {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  store = inject(Store);

  profileForm = new FormGroup({
    name: new FormControl<string | null | undefined>(this.data.name, [Validators.required]),
    company: new FormControl<string | null | undefined>(this.data.company, [Validators.required]),
    website: new FormControl<string | null | undefined>(this.data.website, [Validators.required]),
    phone: new FormControl<string | null | undefined>(this.data.phone, [Validators.required]),
  })

  updateAndCreateUser() {
    if (this.data.id) {
      // @ts-ignore
      this.store.dispatch(updateUser({userId: this.data.id, userNewData: this.profileForm.value }));
      return
    }
    // @ts-ignore
    this.store.dispatch(createUser ({userNewData: this.profileForm.value}))
  }
}
