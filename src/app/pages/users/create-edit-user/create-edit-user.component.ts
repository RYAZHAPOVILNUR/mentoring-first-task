import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../interfaces/users";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatFormField,
    MatButton,
    MatInput,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatIcon,
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent {

  userForm: FormGroup;

  user: User = {
    id: 0,
    userName: '',
    email: '',
    phone: '',
  };

  constructor(
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    this.userForm = new FormGroup({
      userName: new FormControl("", Validators.required),
      userEmail: new FormControl("", [Validators.required, Validators.email]),
      userPhone: new FormControl("", Validators.pattern("[0-9]{10}"))
    });
  }

  //=====*******DIALOG*********=====//
  onNoClick(): void {
    // console.log(this.userForm.value);
    this.dialogRef.close();
  }
  //=====****************=====//
}










// Основные поля объекта реактивной формы Angular:
//
// controls — поля, включая вложенные FormGroup;
// errors — содержит ошибки валидации;
// status — строка, определяющая правильность заполнения формы, значение либо VALID, либо INVALID;
// valid — true, если форма валидна;
// invalid — true, если форма невалидна;
// pristine — true, если не было взаимодействия с полями;
// touched — true, если одно из полей становилось активным (получало фокус);
// dirty — true, если пользователь заполнил хотя бы одно из полей;
// value — значение формы в виде объекта;
// statusChanges — позволяет отслеживать изменение статуса валидности;
// valueChanges — позволяет отслеживать изменение значения.
