import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/_module/Material.Module';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [FormsModule, MaterialModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss'
})
export class UsersFilterComponent {
  private userInputSubject = new Subject<string>();
  @Output() filterChanged = new EventEmitter<string>();

  constructor() {
    this.userInputSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filterChanged.emit(value);
    });
  }

  onFilterChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    this.userInputSubject.next(target.value);
  }
}
