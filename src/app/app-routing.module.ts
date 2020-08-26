import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '',redirectTo: 'login',  pathMatch: 'full'},
  { path: 'home', loadChildren: './pages/home/home.module',canActivate:[AuthGuard]},
  { path: 'login',loadChildren: './pages/login/login.module',canActivate:[LoginGuard] },
  { path: 'details',loadChildren: './pages/details/details.module'  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
