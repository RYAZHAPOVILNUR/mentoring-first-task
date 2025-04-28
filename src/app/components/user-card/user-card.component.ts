import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../interface/user.interface';
import { MatCardModule } from '@angular/material/card';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { EditeUserDialogComponent } from '../edite-user-dialog/edite-user-dialog.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatButtonModule, 
    MatCardModule, MatSnackBarModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<number>();
  @Output() editeUser = new EventEmitter<User>();

  public readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  
  	openEditeDialog() {
    	const dialogRef = this.dialog.open(EditeUserDialogComponent, {
        	data: { user: this.user }
    	});

    	dialogRef.afterClosed().subscribe((editeResult: User | undefined) => {
			if (editeResult) {
				this.editeUser.emit(editeResult);
				this.snackBar.open('Пользователь изменен', 'Ок', {
					duration: 3000,
				})
			} else if (editeResult === false) {
				this.snackBar.open('Пользователь не изменен', 'Закрыть', {
					duration: 3000,
				});
			};
    	});

    	const buttonElement = document.activeElement as HTMLElement;
    	buttonElement.blur();
	}

	openDeleteDialog() {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            data: { user: this.user }
        });

        dialogRef.afterClosed().subscribe((deleteResult: boolean | undefined ) => {
            if (deleteResult) {
                this.deleteUser.emit(this.user.id);
                this.snackBar.open('Пользователь удален', 'Ок', {
                    duration: 3000,
                })
            } else if (deleteResult === false) {
                this.snackBar.open('Пользователь не удален', 'Закрыть', {
                    duration: 3000,
                });
            };
        });

        const buttonElement = document.activeElement as HTMLElement;
        buttonElement.blur();
    }
}
