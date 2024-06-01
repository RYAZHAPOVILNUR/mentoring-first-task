import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from './user';
import { UsersApiService } from './http.service';
import { usersService } from './usersService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [UsersApiService, usersService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent { }