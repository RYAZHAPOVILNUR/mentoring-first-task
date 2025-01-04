import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { IUser } from "../../../Interfaces/IUser";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import { EditUserFormDialogComponent } from "../edit-user-form-dialog/edit-user-form-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIcon } from "@angular/material/icon";
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatTooltip } from "@angular/material/tooltip";
import { CustomUpperCasePipe } from "../../../pipes/upper-case.pipe";
import { YellowDirective } from "../../../derectives/yellow.directive";
import {
  Subject,
  takeUntil
} from 'rxjs';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltip,
    CustomUpperCasePipe,
    YellowDirective
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnDestroy {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();

  @Input()
  public user!: IUser;

  @Output()
  public deleteUser: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public editUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  public openDeleteDialog(): void {
    const dialogRef: MatDialogRef<DeleteUserDialogComponent> = this.dialog.open(DeleteUserDialogComponent, {
      width: '500px',
      data: { user: this.user },
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: Boolean | undefined): void => {
        if (result) {
          this.deleteUser.emit(this.user.id);
          this.snackBar.open('Пользователь удален!', 'Ok', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Отмена изменения', 'Ok', {
            duration: 3000
          });
        }
      });
  }

  public openEditDialog(): void {
    const dialogRef: MatDialogRef<EditUserFormDialogComponent> = this.dialog.open(EditUserFormDialogComponent, {
      width: '500px',
      data: { user: this.user }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.editUser.emit(result);
          this.snackBar.open('Юзер изменен!', 'Ok', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Отмена изменения!', 'Ok', {
            duration: 3000
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
