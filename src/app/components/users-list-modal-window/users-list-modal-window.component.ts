import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersType } from '../../shared/types/users-types.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUser, getUser, updateUser } from '../../core/state/users/users.actions';
import { getEditdata } from '../../core/state/users/users.selector';

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
  templateUrl: './users-list-modal-window.component.html',
  styleUrl: './users-list-modal-window.component.scss',
})
export class UsersListModalWindowComponent implements OnInit {
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<UsersListModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { redact: boolean, id: number }) { }

  title: string = 'Добавить пользователя'
  title_text: string = 'Чтобы создать нового пользователя введите данные и нажмите "сохранить"'

  myForm: FormGroup = new FormGroup({
    "userId": new FormControl("", Validators.required),
    "userName": new FormControl("", Validators.required),
    "userEmail": new FormControl("", [Validators.required, Validators.email]),
    "userCompany": new FormControl("", Validators.required)
  });

  users: UsersType[] = [];

  ngOnInit(): void {
    this.showInputData()
  }

  showInputData() {
    if (this.data.redact === false) {
      this.title = 'Добавить пользователя'
      this.title_text = 'Чтобы создать нового пользователя введите данные и нажмите "сохранить"'
      return
    }
    else {
      this.title = 'Редактировать пользователя'
      this.title_text = 'Чтобы отредактировать пользователя измените данные и нажмите "сохранить"'
      this.store.dispatch(getUser({ id: this.data.id }))
      this.store.select(getEditdata).subscribe(item => {
        this.myForm.get('userId')?.setValue(item.id)
        this.myForm.get('userId')?.disable();
        this.myForm.get('userName')?.setValue(item.name)
        this.myForm.get('userEmail')?.setValue(item.email)
        this.myForm.get('userCompany')?.setValue(item.company.name)
      })
    }
  }

  saveData() {
    if (this.myForm.valid) {
      if (this.data.redact) {
        const _objRedact: UsersType = {
          id: +this.data.id as number,
          name: this.myForm.value.userName as string,
          email: this.myForm.value.userEmail as string,
          company: { name: this.myForm.value.userCompany as string }
        }
        this.store.dispatch(updateUser({ inputdata: _objRedact }))
      }
      else {
        const _obj: UsersType = {
          id: +this.myForm.value.userId as number,
          name: this.myForm.value.userName as string,
          email: this.myForm.value.userEmail as string,
          company: { name: this.myForm.value.userCompany as string }
        }
        this.store.dispatch(addUser({ inputdata: _obj }))
      }
    }
  }

}
