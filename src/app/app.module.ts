import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersApiService } from './services/usersApi.service';
import { UsersService } from './services/users.service';
import { MainComponent } from './components/main/main.component';
import { CreateEditUserComponent } from './dialog/create-edit-user/create-edit-user.component';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    UsersListComponent,
    UserCardComponent,
    UserCardComponent,
    MainComponent,
    CreateEditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    MatSlideToggleModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [
    UsersApiService,
    UsersService,
    LocalStorageService,
    provideRouter(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
