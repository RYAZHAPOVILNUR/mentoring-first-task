import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output
} from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatMiniFabButton } from "@angular/material/button";
import { IUserCreate } from "../../../Interfaces/IUser";
import {
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import { CreateUserFormDialogComponent } from "../create-user-form-dialog/create-user-form-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTooltip } from "@angular/material/tooltip";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-user-btn',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    MatTooltip
  ],
  templateUrl: './create-user-btn.component.html',
  styleUrl: './create-user-btn.component.scss'
})
export class CreateUserBtnComponent implements OnDestroy {
  private readonly dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();

  @Output()
  public createUserBtn: EventEmitter<IUserCreate> = new EventEmitter<IUserCreate>();

  public openCreateBtnDialog(): void {
    const dialog: MatDialogRef<CreateUserFormDialogComponent> = this.dialog.open(CreateUserFormDialogComponent, {
      width: '500px'
    });

    dialog.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: IUserCreate): void => {
        if (result) {
          this.createUserBtn.emit(result);
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
