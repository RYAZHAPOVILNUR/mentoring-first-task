import { Component, Input, OnInit } from "@angular/core";
import { UsersApiService } from "../../http.service";
import { User } from "../../user";

@Component({
    selector: 'user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css']
})

export class UserCard implements OnInit {

    users: User[] = [];

    @Input() name: string = "";
    @Input() username: string = "";
    @Input() email: string = "";
    @Input() phone: string = "";

    constructor(
        private usersService: UsersApiService
    ) { }

    getUsers(): void {
        this.usersService.getUsers()
            .subscribe((users: any) => this.users = users)
    }

    ngOnInit() {
        this.getUsers()
    }
}