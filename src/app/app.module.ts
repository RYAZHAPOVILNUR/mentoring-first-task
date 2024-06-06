import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule, provideClientHydration } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { PopupComponent } from './component/popup/popup.component'
import { UserCardComponent } from './component/user-card/user-card.component'
import { UserListComponent } from './component/user-list/user-list.component'

import { FormsModule } from '@angular/forms'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

import { MatButtonModule } from "@angular/material/button"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"

import { ReactiveFormsModule } from '@angular/forms'

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffect } from './ngrx/users.effects'
import { reducers } from './ngrx/users.reducer'

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCardComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), autoPause: true, trace: false,traceLimit: 75})
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }