import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserEntity } from '../../entities/UserEntity';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.scss'
})
export class UsersCardComponent {
  @Input()
  user!: UserEntity;

  @Output()
  public readonly deleteUser = new EventEmitter<number>();

  public onUserDelete(id: number) {
    this.deleteUser.emit(id)
  }
}
