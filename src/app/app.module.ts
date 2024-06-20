import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module';
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
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersApiService } from './services/usersApi.service';
import { MainComponent } from './components/main/main.component';
import { CreateEditUserComponent } from './dialog/create-edit-user/create-edit-user.component';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducerUsers } from "./+state/users.reducers";
import * as UsersEffects from './+state/users.effects';
import { StorageKey } from "../shared/enums/user.enum";

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
    MatSelectModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    UsersApiService,
    provideEffects(UsersEffects),
    provideStore({[StorageKey.USERS]: reducerUsers}),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
