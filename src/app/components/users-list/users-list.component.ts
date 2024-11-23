import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe, NgFor, NgIf, SlicePipe} from "@angular/common";
import {ApiService} from "../../services/api.service";
import {UserCardComponent} from "./user-card/user-card.component";
import {UsersService} from "../../services/users.service";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {LocalstorageService} from "../../services/localstorage.service";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {delay} from "rxjs";

export interface User{
  id: number;
  name: string;
  username?: string;
  email: string;
  address?:{
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string
  }
}

export interface FormUser{
  name: string;
  email: string;
  website: string;
  companyName: string
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, MatButton, MatInput, FormsModule, NgIf, SlicePipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  url: string = 'https://jsonplaceholder.typicode.com/users';
  readonly usersApi = inject(ApiService);
  readonly dialog = inject(MatDialog);
  readonly dataStorage = inject(LocalstorageService);
  username = '';
  readonly usersService = inject(UsersService);

   constructor() {
    if(this.dataStorage.getItems()){
      console.log('storage')
      this.dataStorage.getItems()
    } else {
      console.log('Request')
      this.usersApi.getData(this.url).subscribe(
        (response: any) => {
          // this.usersService.setUsers(response)
          this.dataStorage.setItems(response)
        }
      )
    }

  }


  deleteUser(userId: number){
     this.dataStorage.deleteItem(userId);
     this.usersService.deleteUser(userId)
  }


  editUser(user: any){
     this.usersService.editUser({
       ...user,
       company: {
         name: user.companyName
       }
     })
    this.dataStorage.editItem({
      ...user,
      company: {
        name: user.companyName
      }
    })

  }

  openDialogEdit(user?: User):void {
    this.dialog.open(EditUserDialogComponent, {
      data: {
        user: user,
        isEdit: user ? true : false
      }
    }).afterClosed()
      .subscribe(result => {
        if(result){
          if(user){
            this.dataStorage.editItem({
              id: result.id,
              name: result.name,
              email: result.email,
              website: result.website,
              company: {
                name: result.companyName
              },
              phone: result.phone
            })
          } else {

            this.dataStorage.addItem({
              id: new Date().getTime(),
              name: result.name,
              email: result.email,
              website: result.website,
              company: {
                name: result.companyName
              },
              phone: result.phone
            })
          }
        }
      })
  }
  deleteAll(){
     this.dataStorage.removeAll()
  }

  returnAll(){
    this.usersApi.getData(this.url).pipe(delay(3000)).subscribe(
      (response: any) => {
        // this.usersService.setUsers(response)
        this.dataStorage.setItems(response)
      }
    )
  }

  searchCardsByName(){
     setTimeout(() => {
       const filteredCards = this.dataStorage.getItems().filter((card: User) => {
         return card.name.toLowerCase().includes(this.username.toLowerCase())
       })
       this.dataStorage.updateItems(filteredCards)
       return filteredCards;
     },2000)
  }

  protected readonly localStorage = localStorage;
  protected readonly LocalstorageService = LocalstorageService;
  protected readonly delay = delay;
}
