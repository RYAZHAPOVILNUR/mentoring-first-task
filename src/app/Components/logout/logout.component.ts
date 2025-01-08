import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatDialogClose } from "@angular/material/dialog";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose,
    MatTooltip,
    MatIcon
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent { }
