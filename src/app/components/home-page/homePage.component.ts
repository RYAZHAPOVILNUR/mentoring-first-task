import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";


const menuPagination = ['5', '4', '3', '2', '1'];

console.log(menuPagination);

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './homePage.component.html',
    styleUrl: './homePage.component.scss',
    imports: [RouterOutlet, NgFor, NgIf],
})

export class HomePageComponent {
    readonly menuPagination = menuPagination

    isShowMen = true;
}