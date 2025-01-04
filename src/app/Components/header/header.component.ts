import {
  Component,
  inject,
  OnDestroy
} from '@angular/core';
import {
  AsyncPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomCurrentDateTimePipe } from '../../pipes/current-date-time.pipe';
import { RemoveDashesPipe } from '../../pipes/remove-dashes.pipe';
import { ColorBasketDirective } from '../../derectives/color-basket.directive';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AuthComponent } from '../auth/auth.component';
import { MatButton } from '@angular/material/button';
import { LogoutComponent } from '../logout/logout.component';
import { textCatalogCompany } from '../utils/show-catalog';
import { menuItems } from '../utils/menu-items';
import {
  toLowerCaseArray,
  toUpperCaseArray,
} from '../utils/upper-case-menu-items';
import {
  Subject,
  takeUntil
} from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
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
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  private readonly dialog: MatDialog = inject(MatDialog);
  public userService: UserService = inject(UserService);
  private destroy$ = new Subject<void>();

  public readonly headerItem1 = 'Главная';
  public readonly aboutCompany: string = textCatalogCompany('О компании');
  public readonly headerItem3 = 'Каталог';
  public readonly headerDate = 'Дата';
  public readonly currentDate: Date = new Date();
  public showCatalogCompany: boolean = true;
  public menuItems: string[] = menuItems;
  public isUppercase: boolean = true;

  public changeMenuText(): boolean {
    this.menuItems = this.isUppercase ? toLowerCaseArray(this.menuItems) : toUpperCaseArray(this.menuItems);
    return (this.isUppercase = !this.isUppercase);
  }

  public openLoginDialog(): void {
    const dialogRef: MatDialogRef<AuthComponent> = this.dialog.open(AuthComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: string): void | null => {
        result === 'admin' ? this.userService.loginAsAdmin() :
          result === 'user' ? this.userService.loginAsUser() : null;
      });
  }

  public logoutOpenDialog(): void {
    const dialogRef: MatDialogRef<LogoutComponent> = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: string) => {
        result === 'logout' ? this.userService.logout() : null;
      });
  }
  
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
