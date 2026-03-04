import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-delete-user-csrd-dialog-component',
  templateUrl: './delete-user-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogClose,
    MatInputModule,
    MatCard,
    MatCardContent,
    MatCardModule,
    MatButton,
  ],
})
export class DeleteUserDialogComponent {
  readonly data: { user: User } = inject<{ user: User }>(MAT_DIALOG_DATA);

  get userId(): number {
    return this.data.user.id;
  }
}
