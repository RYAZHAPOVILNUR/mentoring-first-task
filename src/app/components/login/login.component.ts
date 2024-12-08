import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private authService: AuthService,private router: Router) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit(){
    this.authService.login(this.myForm.value).subscribe({
      next: () => this.router.navigate(['admin']),
      error: err => alert(err.message)
    })
  }

}
