import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [NavigationComponent]
})
export class HeaderComponent {

}
