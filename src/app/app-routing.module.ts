import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './auth/login/login.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { MyArticleViewComponent } from './pages/my-article-view/my-article-view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'add_article',
    component: AddArticleComponent,
  },
  {
    path: 'my_article',
    component: MyArticleViewComponent,
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];


const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
