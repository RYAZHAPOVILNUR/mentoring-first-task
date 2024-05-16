import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersType } from '../../../shared/types/users-types.type';
import { addUser, getUser, updateUser } from '../../../core/state/users/users.actions';
import { getEditdata } from '../../../core/state/users/users.selector';
import { UsersBackendService } from '../../../core/services/backend-users/users-backend.service';

@Component({
  selector: 'dialog-animations-example-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './users-back-modal-window.component.html',
  styleUrl: './users-back-modal-window.component.scss',
})
export class UsersBackModalWindowComponent implements OnInit {
  title: string = 'Добавить пользователя'
  title_text: string = 'Чтобы создать нового пользователя введите данные и нажмите сохранить'
  myForm: FormGroup;
  users: UsersType[] = [];

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<UsersBackModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private fb: FormBuilder,
    private usersBackendService: UsersBackendService
  ) {
    this.myForm = this.fb.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userCompany: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.showInputData()
  }

  showInputData() {

    this.title = 'Редактировать пользователя';
    this.title_text = 'Чтобы отредактировать пользователя измените данные и нажмите "сохранить"';
    this.usersBackendService.getBackUser(this.data.userId).subscribe(item => {
      console.log(item);

      this.myForm.patchValue({
        userId: 123,
        userName: item.name,
        userEmail: item.email,
        userCompany: item.name
      });
      // this.myForm.get('userId')?.disable();
    });
    // this.store.dispatch(getUser({ id: this.data.userId }));

  }

  saveData() {
    // if (this.myForm.valid) {
    //   const formData = this.myForm.value;
    //   const _obj: UsersType = {
    //     id: formData.userId,
    //     name: formData.userName,
    //     email: formData.userEmail,
    //     company: { name: formData.userCompany }
    //   };
    //   this.store.dispatch(addUser({ inputdata: _obj }));

    // }
  }

}