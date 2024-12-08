import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";
import {DeleteConfirmDialogComponent} from "../delete-confirm-dialog/delete-confirm-dialog.component";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {UpperCasePipe} from "@angular/common";
import {CustomUpperCasePipe} from "../../../pipes/custom-upper-case.pipe";
import {CustomFormPhonePipe} from "../../../pipes/custom-form-phone.pipe";
import {RedDirectiveJsDirective} from "../../../directives/red.directive.js.directive";
import {User} from "../users-list.component";
import {LocalstorageService} from "../../../services/localstorage.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatButton,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    UpperCasePipe,
    CustomUpperCasePipe,
    CustomFormPhonePipe,
    RedDirectiveJsDirective
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Output()
  openDialogEdit = new EventEmitter();


  @Input()
  user: any

  @Output()
  deleteUser = new EventEmitter()

  @Output()
  editUser: EventEmitter<User> = new EventEmitter()

  readonly dialog = inject(MatDialog);

  toEditUser(){
    this.editUser.emit(this.user)
  }


  openDialogDelete():void{
    this.dialog.open(DeleteConfirmDialogComponent,
      {data: {user: this.user},
    }).afterClosed()
    .subscribe(editResult => {
      if(editResult){
        this.deleteUser.emit(this.user.id)
      }
    })
  }
}
