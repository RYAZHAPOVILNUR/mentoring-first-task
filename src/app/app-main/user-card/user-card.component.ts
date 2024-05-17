import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TUserEntity } from '../../libs/core/data-access/src/lib/users-data.models';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: TUserEntity;
  @Output() onDeleteUser = new EventEmitter<number>();
}
