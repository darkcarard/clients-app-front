import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ClientListComponent } from './feature/clients/client-list/client-list.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientFormComponent } from './feature/clients/client-form/client-form.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { ClientDetailComponent } from './feature/clients/client-detail/client-detail.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './feature/users/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

const ROUTES: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/page/:page', component: ClientListComponent },
  { path: 'clients/form', component: ClientFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'clients/form/:id', component: ClientFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientListComponent,
    ClientFormComponent,
    PaginatorComponent,
    ClientDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
                        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
