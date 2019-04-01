import { NgModule } from '@angular/core';
import { PreloadAllModules,Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'add', loadChildren: './admin/add/add.module#AddPageModule' },
  { path: 'edit', loadChildren: './admin/edit/edit.module#EditPageModule' },
  { path: 'adminhome', loadChildren: './admin/adminhome/adminhome.module#AdminHomePageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: '', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'details', loadChildren: './details/details.module#DetailsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
