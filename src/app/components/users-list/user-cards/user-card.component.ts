import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { User } from '../../../Interfaces/user.interface';
import { EditUserComponent } from '../edit-user-dialog/edit-user-dialog.component';
import {MatDialog}  from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  imports: [NgFor, UserFormComponent, MatButtonModule, MatTooltipModule],
  standalone: true,

})
export class UserCardComponents {
  
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  
  @Input()
    user!: User;
    
  @Output()
  deleteUser = new EventEmitter();
  
  @Output()
  editUser = new EventEmitter();
  
  onDeleteUser(userId: any) {
    this.deleteUser.emit(userId);
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { user: this.user},
    });

    dialogRef.afterClosed().subscribe(editResult => {
      if(!editResult) return;
      this.editUser.emit(editResult)
    });
  }
  
  openSnackBar() {
    this.snackBar.open('Пользователь удален', 'Закрыть', {
      duration: 3000,
      horizontalPosition: 'center', 
      verticalPosition: 'bottom', 
    });
  }
  
}

