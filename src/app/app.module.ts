import { EchartsBarComponent } from './components/echarts/echarts-bar.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatTableModule } from '@angular/material/table';
import {
  NbAlertModule, NbCardModule,
  NbChatModule, NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule, NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbActionComponent,
  NbUserModule,
  NbActionsModule,
  NbIconModule,
} from '@nebular/theme';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EchartsBarLineComponent } from './components/echarts/echarts-bar-line.component';
import { EchartsBarLineScanComponent } from './components/echarts/echarts-bar-line-scan.component';
import { EchartsBarRespectDelaisComponent } from './components/echarts/echarts-bar-respect-delais.component';
import { DatatablesMissionsComponent } from './components/datatables-missions/datatables-missions.component';

import { MatSelectModule, MatButtonModule, MatGridListModule, MatCardModule, MatDialogModule, MatPaginatorModule, MatButtonToggleModule, MatProgressSpinnerModule } from "@angular/material";
import { DialogBoxComponent } from './@theme/components/dialog-box/dialog-box.component';


const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, EchartsBarComponent, LogoutComponent, EchartsBarLineComponent, EchartsBarLineScanComponent, EchartsBarRespectDelaisComponent, DatatablesMissionsComponent, DialogBoxComponent],
  imports: [
    NbIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbCheckboxModule,
    ThemeModule.forRoot(),
    NbSidebarModule,
    NbLayoutModule,
    NgxChartsModule,
    NgxEchartsModule,
    NbActionsModule,
    NbUserModule,
    DataTablesModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatTableModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://cogepart.fr/zou-api/v1',
          login: {
            endpoint: '/api/auth/login',
            redirect: {
              success: '/pages/dashboard/',
              failure: null,
            },
          },
          token: {
            class: NbAuthJWTToken,
          },
        }),
      ],
    }),
    CoreModule.forRoot(),
    NbCardModule,
    ThemeModule,
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
