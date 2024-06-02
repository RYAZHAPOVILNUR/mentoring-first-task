import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { UiService } from '../../services/ui/ui.service.service';
import { MatListItem, MatNavList } from '@angular/material/list';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatToolbar,
        MatIcon,
        MatIconButton,
        RouterLink,
        RouterLinkActive,
        MatAnchor,
        RouterOutlet,
        MatSlideToggle,
        MatButton,
        MatSidenavContainer,
        MatSidenav,
        MatNavList,
        MatListItem,
        AsyncPipe,
        MatSidenavModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    color: ThemePalette = 'accent';
    checked = false;
    disabled = false;
    private breakpointObserver = inject(BreakpointObserver);

    links = [
        { url: '/', name: 'Home' },
        { url: '/users', name: 'Users' },
        { url: '/forms', name: 'Forms Tests' },
        { url: '/display', name: 'Display' },
    ];
    constructor(
        private _uiService: UiService,
        private _router: Router
    ) {}

    onSidenavSet(drawer: MatSidenav) {
        this._uiService.drawer = drawer;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches),
        shareReplay()
    );
}
