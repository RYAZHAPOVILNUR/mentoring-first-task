import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {User} from "../../../data/interfaces/userApiService";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    NgForOf,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user!: User; // Benutzer-Objekt, das übergeben wird
  @Output() userRemoved = new EventEmitter<number>(); // Ereignis, wenn ein Benutzer entfernt wird

  // Diese Methode wird aufgerufen, wenn der Benutzer auf "Entfernen" klickt
  removeUser() {
    this.userRemoved.emit(this.user.id); // Emit der Benutzer-ID
  }
}
