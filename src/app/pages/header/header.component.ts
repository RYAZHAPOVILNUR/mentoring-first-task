import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { UiService } from '../../services/ui/ui.service.service';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MaterialModule } from '../../../_module/Materila.Module';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        MatSlideToggle,
        AsyncPipe,
        MatSidenavContainer,
        MatSidenav,
        MatSidenavContent,
        MatToolbar,
        MatNavList,
        MatListItem,
        MatIconButton,
        MatIcon,
        MatAnchor,
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
    ];
    constructor(private _uiService: UiService) {}

    onSidenavSet(drawer: MatSidenav) {
        this._uiService.drawer = drawer;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches),
        shareReplay()
    );
}
