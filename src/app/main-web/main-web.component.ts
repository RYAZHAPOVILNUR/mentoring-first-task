import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { UsersListComponent } from "../users-list/users-list.component";


@Component({
    selector: 'main-web',
    templateUrl: './main-web.component.html',
    styleUrls: ['./main-web.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, UsersListComponent]
})

export class MainWebComponent {
      newPages = [5, 4, 3, 2, 1];

    
}