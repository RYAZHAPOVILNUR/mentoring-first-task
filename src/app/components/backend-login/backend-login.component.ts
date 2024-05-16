import { Component } from '@angular/core';
import { AuthLocalStorageService } from '../../core/services/backend-users/backend-local-storage.service';
import { CommonModule } from '@angular/common';
import { BackendSignInComponent } from './backend-sign-in/backend-sign-in.component';
import { BackendSignUpComponent } from './backend-sign-up/backend-sign-up.component';
import { MaterialModule } from '../../shared/_module/Material.Module';

@Component({
  selector: 'app-backend-login',
  standalone: true,
  imports: [CommonModule, BackendSignInComponent, BackendSignUpComponent, MaterialModule],
  templateUrl: './backend-login.component.html',
  styleUrl: './backend-login.component.scss'
})
export class BackendLoginComponent {

  loggedIn: boolean = false
  signedUp: boolean = false
  constructor() { }

  logIn() {
    this.loggedIn = !this.loggedIn
    this.signedUp = false
  }
  signUp() {
    this.signedUp = !this.signedUp
    this.loggedIn = false
  }
}
