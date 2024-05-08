import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { UsersService } from '../user.service';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,

  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})

export class AddUserDialogComponent {
  private usersService = inject(UsersService);
  public readonly users$ = this.usersService.users$;

  fb = inject(FormBuilder);
  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required]
  })
  saveUser(): void {
    if (this.form.valid) {
      const userData = {
        // здесь реализовать айдишник
        
        name: this.form.value.name!,
        phone: this.form.value.phone!,
        email: this.form.value.email!
      }
      this.usersService.addUser(userData)
      this.users$.subscribe({
        next: res => console.log(res.length)
      })
    }
  }
}
