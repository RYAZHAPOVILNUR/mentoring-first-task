import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { User } from './user';
import { UsersApiService } from './http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [UsersApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent { }