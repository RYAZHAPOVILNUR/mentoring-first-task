import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { UsersApiService } from "./http.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [UsersApiService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
