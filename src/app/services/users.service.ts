import { Injectable } from '@angular/core';
import {IUser} from "../models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: IUser[] = [];
  public userDetail: IUser | null = null;
  constructor() { }
}
