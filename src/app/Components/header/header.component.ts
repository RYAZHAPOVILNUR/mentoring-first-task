import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {map} from "rxjs";
import {RouterLink} from "@angular/router";
import {CustomCurrentDateTimePipe} from "../../pipes/current-date-time.pipe";
import {RemoveDashesPipe} from "../../pipes/remove-dashes.pipe";
import {ColorBasketDirective} from "../../derectives/color-basket.directive";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";
import {AuthComponent} from "../auth/auth.component";
import {MatAnchor, MatButton} from "@angular/material/button";
import {LogoutComponent} from "../logout/logout.component";

const textCatalogCompany: (textMenu: string) => string = (textMenu: string): string => textMenu;

const text: string = textCatalogCompany('О компании');

const menuItems: string[] = ['Каталог', 'Запчасти', 'Интерьер', 'Стиль', 'Партнеры'];

const upperCaseMenuItems: string[] = menuItems.map((item: string): string => {
  return item.toUpperCase()
});

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgFor,
    RouterLink,
    CustomCurrentDateTimePipe,
    RemoveDashesPipe,
    ColorBasketDirective,
    AsyncPipe,
    MatButton,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  public userService: UserService = inject(UserService);

  public readonly headerItem1 = 'Главная';
  public readonly aboutCompany: string = text;
  public readonly headerItem3 = 'Каталог';

  public readonly headerDate = 'Дата';
  public readonly currentDate: Date = new Date();

  public showCatalogCompany: boolean = true;
  public menuItems: string[] = upperCaseMenuItems;

  isUppercase: boolean = true;

  public changeMenuText(): boolean {
    this.menuItems = upperCaseMenuItems.map(
      (item: string): string => this.isUppercase ? item.toLowerCase() : item.toUpperCase()
    )

    return this.isUppercase = !this.isUppercase;
  }

  public openLoginDialog(): void {
    const dialogRef: MatDialogRef<AuthComponent> = this.dialog.open(AuthComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        this.userService.loginAsAdmin();
        this.snackBar.open('Вы вошли как Админ!', 'Ok', {
          duration: 3000
        });
      } else if (result === 'user') {
        this.userService.loginAsUser();
        this.snackBar.open('Вы вошли как Юзер!', 'Ok', {
          duration: 3000
        });
      } else {
        return undefined;
      }
    });
  };

  public logoutOpenDialog(): void {
    const dialogRef: MatDialogRef<LogoutComponent> = this.dialog.open(LogoutComponent);
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'logout') {
        this.userService.logout();
        this.snackBar.open('Вы вышли из кабинета!', 'Ok', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Отмена выхода!', 'Ok', {
          duration: 3000
        });
        return undefined;
      }
    });
  };

}
