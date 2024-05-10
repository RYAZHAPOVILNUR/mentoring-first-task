import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UsersApiService} from "../../services/users-api.service";
import {Observable} from "rxjs";
import {IUser} from "../../models/user.interface";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userApi :UsersApiService) {}

  public userDetail$!: Observable<IUser | null>;
  public ava: string[] = [
    'https://img.freepik.com/free-psd/3d-illustration-of-person-with-sunglasses_23-2149436188.jpg?t=st=1713040933~exp=1713041533~hmac=b5618e0ce10e9683fa7ec8723a65b2030f949625a0f64c8763c2420233eee197',
    'https://img.freepik.com/free-psd/3d-illustration-of-person-with-glasses_23-2149436185.jpg?w=740&t=st=1713040933~exp=1713041533~hmac=4c47b1dba541f07bd91644809b3135cf5648859bb20f407fec8f5d16b66ea9dd'
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userApi.getUser(Number(id));
      this.userDetail$ = this.userApi.entitiesUserDetail$;
    }
  }
}
