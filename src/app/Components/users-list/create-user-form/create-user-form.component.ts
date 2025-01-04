import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output
} from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateUserFormDialogComponent } from "../create-user-form-dialog/create-user-form-dialog.component";
import { IUserCreate } from "../../../Interfaces/IUser";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent implements OnDestroy {
  private readonly dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();

  @Output()
  public createUser: EventEmitter<IUserCreate> = new EventEmitter<IUserCreate>();

  public openCreateDialog(): void {

    const dialogRef: MatDialogRef<CreateUserFormDialogComponent> = this.dialog.open(CreateUserFormDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: IUserCreate): void => {
        if (result) {
          this.createUser.emit(result);
          this.snackBar.open('Юзер создан!', 'Ok', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Отмена создания!', 'Ok', {
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
