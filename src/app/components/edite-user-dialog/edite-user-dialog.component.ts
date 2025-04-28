import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { User } from '../../interface/user.interface';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edite-user-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, NgIf, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatDialogClose, MatDialogContent, MatDialogActions
  ],
  templateUrl: './edite-user-dialog.component.html',
  styleUrl: './edite-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditeUserDialogComponent {
    public readonly data = inject<{user: User}>(MAT_DIALOG_DATA);

    editeForm = new FormGroup ({
        id: new FormControl(this.data.user.id),
        name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(4)]),
        company: new FormGroup ({
            name: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(4)]),
        })
    });

    get userWithUpdatedField() {
        return {
            ...this.editeForm.value,
        };
    }

    onCancel() {
        this.editeForm.reset();
    }
}
