import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
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
import {async, delay} from "rxjs";
import {Store} from "@ngrx/store";
import {UsersActions} from "../store/users.actions";
import {selectUsers} from "../store/users.selectors";

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
export class UsersListComponent implements OnInit {
  readonly usersApi = inject(ApiService);
  readonly dialog = inject(MatDialog);
  readonly dataStorage = inject(LocalstorageService);
  username = '';
  readonly usersService = inject(UsersService);

  private readonly store = inject(Store);

  public users$ = this.store.select(selectUsers);

  cards!: User[];

   constructor() {
    // this.usersApi.getData(this.url).subscribe((response: any) => {
    //   this.store.dispatch(UsersActions.set({users: response}))
    //   this.cards = response;
    // })

     // this.store.dispatch(UsersActions.loadUser({str: 'loading...'}))


   }

  ngOnInit(): void {
     // this.store.select(selectUsers).subscribe((users: User[]) => {
     //   this.cards = users
     //   if(users.length){
     //     this.dataStorage.setItems(users)
     //   } else {
     //     this.dataStorage.removeAll()
     //   }
     // });
    this.store.dispatch(UsersActions.loadUser({str: 'loading...'}))

  }


  deleteUser(userId: number){
     this.dataStorage.deleteItem(userId);
     this.usersService.deleteUser(userId)
     this.store.dispatch(UsersActions.delete({id: userId}))
     this.dataStorage.deleteItem(userId)
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

    this.store.dispatch(UsersActions.edit({user: user}))

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
            this.store.dispatch(UsersActions.edit({user: {
                id: user.id,
                name: result.name,
                email: result.email,
                website: result.website,
                company: {
                  name: result.companyName
                },
                phone: result.phone
              }}))
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

            this.store.dispatch(
              UsersActions.create({
                user: {
                  id: new Date().getTime(),
                  name: result.name,
                  email: result.email,
                  website: result.website,
                  company: {
                    name: result.companyName
                  },
                  phone: result.phone
                }
              })
            )

          }
        }
      })
  }
  deleteAll(){
     this.dataStorage.removeAll()
     this.store.dispatch(UsersActions.deleteAll({name: 'Nikita'}))
  }

  returnAll(){
    // this.usersApi.getData(this.url).pipe(delay(3000)).subscribe(
    //   (response: any) => {
    //     // this.usersService.setUsers(response)
    //     this.dataStorage.setItems(response)
    //     this.store.dispatch(UsersActions.set({users: response}))
    //   }
    // )

    this.store.dispatch(UsersActions.loadUser({str: 'loading...'}))
  }

  searchCardsByName(username: string){
      // setTimeout(() => {
      //   const filteredCards = this.dataStorage.getItems().filter((card: User) => {
      //     return card.name.toLowerCase().includes(this.username.toLowerCase())
      //   })
      //   this.dataStorage.updateItems(filteredCards)
      //   return filteredCards;
      // },2000)
    this.store.dispatch(UsersActions.searchByName({name: username}))
    console.log(1)
  }

  protected readonly localStorage = localStorage;
  protected readonly LocalstorageService = LocalstorageService;
  protected readonly delay = delay;

}
