import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '',redirectTo: 'login',  pathMatch: 'full'},
 // { path: 'home',canActivate:[AuthGuard],loadChildren:() => import('./pages/home/home.module').then(m => m.HomePageModule)},
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'/*,canActivate:[AuthGuard]*/},
 // { path: 'login',canActivate:[LoginGuard],loadChildren:() => import('./pages/login/login.module').then(m => m.LoginPageModule)},
  { path: 'login',loadChildren: './pages/login/login.module#LoginPageModule'/*,canActivate:[LoginGuard]*/},
 // { path: 'details',loadChildren:() => import('./pages/details/details.module').then(m => m.DetailsPageModule)},
  { path: 'details',loadChildren: './pages/details/details.module#DetailsPageModule'/*,canActivate:[AuthGuard]*/},
  { path: 'details/:id',loadChildren: './pages/details/details.module#DetailsPageModule'/*,canActivate:[AuthGuard]*/},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
