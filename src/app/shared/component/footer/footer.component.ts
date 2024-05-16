import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [NavigationComponent]
})
export class FooterComponent {

}
