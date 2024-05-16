import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/_module/Material.Module';
import { AuthBackendService } from '../../../core/services/backend-users/auth-backend.service';
import { AuthLocalStorageService } from '../../../core/services/backend-users/backend-local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backend-sign-in',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './backend-sign-in.component.html',
  styleUrl: './backend-sign-in.component.scss'
})
export class BackendSignInComponent implements OnDestroy {
  form: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authBackendService: AuthBackendService,
    private authLocalStorageService: AuthLocalStorageService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.subscription.add(
        this.authBackendService.getTokenFromBackend(this.form.value.email, this.form.value.password).subscribe({
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
