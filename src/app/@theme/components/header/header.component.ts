import { Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme'

import { UserData } from '../../../@core/data/users'
import { LayoutService } from '../../../@core/utils'
import { map, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth'
import { link } from 'fs'
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>()
  userPictureOnly: boolean = false
  user: any
  idclient: any
  username: any

  themes = [
    {
      value: 'default',
      name: 'Clair',
    },
    {
      value: 'dark',
      name: 'Sombre',
    }
  ]

  currentTheme = 'default'

  userMenu = [
    {
      title: 'Déconexion',
      link: '/logout',
    },
  ]

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    private router: Router,
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload() // here we receive a payload from the token and assigns it to our `user` variable
      }
    })
  }

  ngOnInit() {
    let cache: any
    if (localStorage.getItem('connect') != null) {
      this.idclient = JSON.parse(localStorage.getItem('connect')).client_id
      cache = JSON.parse(localStorage.getItem('connect'))
      this.idclient = cache.client_id
      this.username = cache.nom_client
      this.currentTheme = this.themeService.currentTheme

      this.userService
        .getUsers()
        .pipe(takeUntil(this.destroy$))
        .subscribe((users: any) => (this.user = users.nick))

      const { xl } = this.breakpointService.getBreakpointsMap()
      this.themeService
        .onMediaQueryChange()
        .pipe(
          map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
          takeUntil(this.destroy$),
        )
        .subscribe(
          (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl),
        )

      this.themeService
        .onThemeChange()
        .pipe(
          map(({ name }) => name),
          takeUntil(this.destroy$),
        )
        .subscribe(themeName => (this.currentTheme = themeName))
    } else {
      this.router.navigate(['/auth'])
    }
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName)
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar')
    this.layoutService.changeLayoutSize()

    return false
  }

  navigateHome() {
    this.menuService.navigateHome()
    return false
  }
}
