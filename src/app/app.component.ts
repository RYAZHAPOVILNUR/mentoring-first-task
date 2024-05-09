import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import {UsersService} from "./users.service";
import {User} from "./user.interface";
import {UserCardComponent} from "./user-card/user-card.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {UserAddComponent} from "./user-add/user-add.component";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogModule, RouterOutlet, UsersListComponent, HttpClientModule, UserCardComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements  OnInit {
  title = 'mentoring-first-project';
  user: User | undefined;

  constructor(private userService: UsersService, private matDialog: MatDialog) {
  }

  openDialog() {
    this.matDialog.open(UserAddComponent, {
      width: '400px',
    })
  }

  loadUsers(): void {
  }

  ngOnInit() {
    this.userService.loadUsers()
  }
}
//   saveData() {
//     let dataUsers = this.userService.usersSubject$;
//     console.log('dataUsers');
//     console.log(dataUsers.value);
//     this.userService.saveData(dataUsers.value)
//   }
//   loadData() {
//     this.userService.loadData()
//   }
// }
