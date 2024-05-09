import {Component, OnInit,} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import {UsersService} from "../Services/user.service";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, MatCard, MatCardHeader, MatCardContent, MatButton],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {

  public readonly users$ = this.usersService.users$;

  constructor(
    private usersService: UsersService,
    private readonly _location: Location,
    public dialog: MatDialog,
  ) {

  }
  backClicked(){
    this._location.back();
  }

  ngOnInit(): void {
    this.usersService.loadUsers();
  }
  deleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

  openDialog() {
    this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: 'right click'
    })
  }
}
