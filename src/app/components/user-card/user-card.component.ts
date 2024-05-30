import { Component, Input, OnInit } from "@angular/core";
import { UsersApiService } from "../../http.service";
import { IUser } from "../../user";

@Component({
    selector: 'user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css']
})

export class UserCard implements OnInit {

    @Input() name: string = "";
    @Input() username: string = "";
    @Input() email: string = "";
    @Input() phone: string = "";
    
    ngOnInit() {
    }
}