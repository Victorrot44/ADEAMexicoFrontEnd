import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessToLoginGuard } from './guard/access-to-login.guard';
import { AuthGuard } from './guard/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { LoginComponent } from './pages/login/login.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AccessToLoginGuard] },
  { path: 'login', redirectTo: '' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'user/add', component: FormUserComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: FormUserComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: SignOutComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: '**', pathMatch: 'full', component: ErrorNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
