import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserListComponent } from "./core/components/user-list/user-list.component";
import { UserCardComponent } from "./core/components/user-card/user-card.component";
import { CreateEditUserComponent } from "./core/components/create-edit-user/create-edit-user.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserListComponent, UserCardComponent, CreateEditUserComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Junior Project';
  constructor(private router: Router, private route: ActivatedRoute) { }

  isHomeRoute() {
    return this.route.snapshot.url.toString() === '';
  }
  
       
  navigateToUserList() {
    this.router.navigate(['/users']);
  }
}
