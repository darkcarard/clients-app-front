import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ClientListComponent } from './feature/clients/client-list/client-list.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClientFormComponent } from './feature/clients/client-form/client-form.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { ClientDetailComponent } from './feature/clients/client-detail/client-detail.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/page/:page', component: ClientListComponent },
  { path: 'clients/form', component: ClientFormComponent },
  { path: 'clients/form/:id', component: ClientFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientListComponent,
    ClientFormComponent,
    PaginatorComponent,
    ClientDetailComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
