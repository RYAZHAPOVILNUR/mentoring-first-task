import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/_module/Material.Module';
import { Subscription } from 'rxjs';
import { AuthLocalStorageService } from '../../../core/services/backend-users/backend-local-storage.service';
import { AuthBackendService } from '../../../core/services/backend-users/auth-backend.service';

@Component({
  selector: 'app-backend-sign-up',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './backend-sign-up.component.html',
  styleUrl: './backend-sign-up.component.scss'
})
export class BackendSignUpComponent implements OnDestroy {
  form: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
    private authBackendService: AuthBackendService,
    private authLocalStorageService: AuthLocalStorageService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.subscription.add(
        this.authBackendService.signUp(
          this.form.value.name,
          this.form.value.email,
          this.form.value.password,
          this.form.value.username,
          this.form.value.city
        ).subscribe({
          next: (response) => {
            this.authLocalStorageService.setToken(response.authToken);
          },
          error: (error) => {
            console.error(error);
          }
        })
      );
    } else {
      alert('форма не валидна');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
