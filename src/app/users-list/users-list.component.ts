import {Component, OnInit, Output} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import {UsersService} from "../Services/user.service";
// import {DialogOverviewExample} from "../dialog-data/dialog-data.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {

  public readonly users$ = this.usersService.users$;

  constructor(
    private usersService: UsersService,
    private readonly _location: Location
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
}
