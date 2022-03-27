import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { AboutComponent } from './pages/about/about.component';
import { UsersComponent } from './pages/users/users.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { SearchByNamePipe } from './pipe/search-by-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorNotFoundComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SignOutComponent,
    AboutComponent,
    UsersComponent,
    FormUserComponent,
    SearchByNamePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
