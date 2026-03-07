import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../user.service';
import { CartDirective } from '../directives/cart.directive';
import { ShadowDirective } from '../directives/shadow.directive';

const aboutCompanyFn = (title: string) => title;
const aboutCompanyy: string = aboutCompanyFn('О компании');
const menuItems: string[] = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];

const upperCaseMenuItems = menuItems.map((item: string) => {
  return item.toUpperCase();
});

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    AsyncPipe,
    NgIf,
    CartDirective,
    ShadowDirective,
  ],
  styleUrl: './header.component.scss',
})
export class HearderComponent {
  today: number = Date.now();
  readonly headerItem1: string = 'Главная';
  readonly aboutCompany: string = aboutCompanyy;
  readonly headerItem3: string = 'Католог';
  isShowCatalog: boolean = true;
  readonly header2Item1: string = upperCaseMenuItems[0];
  menuItems: string[] = upperCaseMenuItems;
  isUpperCase: boolean = true;
  readonly dialog: MatDialog = inject(MatDialog);
  public readonly userService: UserService = inject(UserService);

  public changeMenuText(): void {
    this.menuItems = upperCaseMenuItems.map((item: string) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase(),
    );
    this.isUpperCase = !this.isUpperCase;
  }

  public openDialog(): void {
    const dialogRef: MatDialogRef<AuthComponent> = this.dialog.open(
      AuthComponent,
      {
        width: '400px',
        height: '200px',
      },
    );

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(result);
      if (result === 'admin') {
        this.userService.loginisAdmin();
      } else if (result === 'user') {
        this.userService.loginisUser();
      } else return undefined;
    });
  }

  public logout(): void {
    this.userService.logout();
    console.log('совершили логаут');
  }
}
