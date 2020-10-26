import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), canActivate: [LoginGuard]
  },

  {
    path: 'detail',
    loadChildren: () => import('./pages/detail/detail.module').then(m => m.DetailPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/detail/detail.module').then(m => m.DetailPageModule)
  },
  
  {
    path: 'detailscursion',
    loadChildren: () => import('./pages/detailscursion/detailscursion.module').then(m => m.DetailscursionPageModule)
  },

  {
    path: 'detailscursion/:id',
    loadChildren: () => import('./pages/detailscursion/detailscursion.module').then(m => m.DetailscursionPageModule)
  },

  {
    path: 'gps',
    loadChildren: () => import('./pages/gps/gps.module').then( m => m.GpsPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'galeria-fotos',
    loadChildren: () => import('./pages/galeria-fotos/galeria-fotos.module').then( m => m.GaleriaFotosPageModule)
  },

  {
    path: 'galeria-fotos/:id',
    loadChildren: () => import('./pages/galeria-fotos/galeria-fotos.module').then( m => m.GaleriaFotosPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
