import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    standalone: true,
      imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule]
})
export class UserCardComponent {
    @Input()
  user: any;

  @Output()
  deleteUser = new EventEmitter();

  @Output()
  editUser = new EventEmitter();


  readonly dialog = inject(MatDialog)
  snackBar: any;

  openDialog(): void {
    this.dialog.
    open(EditUserDialogComponent, {
      data: {user:this.user},
    }).afterClosed().subscribe(editResult => {
      console.log('Modalka closed,form value', editResult);
     if(!editResult)return;
      this.editUser.emit(editResult)
    });

  }
  
  onDeleteUser(uersId: number) {
    this.deleteUser.emit(uersId);
  }
}