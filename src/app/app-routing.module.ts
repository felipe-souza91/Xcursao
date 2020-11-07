import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pag-inicial', pathMatch: 'full' },
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
    path: 'detail/:email',
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
    loadChildren: () => import('./pages/gps/gps.module').then(m => m.GpsPageModule)
  },


  {
    path: 'addphoto',
    loadChildren: () => import('./pages/addphoto/addphoto.module').then(m => m.AddphotoPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule)
  },

  {
    path: 'favoritos/:id',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule)
  },
  {
    path: 'alterar-login',
    loadChildren: () => import('./pages/alterar-login/alterar-login.module').then(m => m.AlterarLoginPageModule)
  },

  {
    path: 'alterar-login/:id',
    loadChildren: () => import('./pages/alterar-login/alterar-login.module').then(m => m.AlterarLoginPageModule)
  },
  {
    path: 'detailscursion-favorito',
    loadChildren: () => import('./pages/detailscursion-favorito/detailscursion-favorito.module').then(m => m.DetailscursionFavoritoPageModule)
  },

  {
    path: 'detailscursion-favorito/:id',
    loadChildren: () => import('./pages/detailscursion-favorito/detailscursion-favorito.module').then(m => m.DetailscursionFavoritoPageModule)
  },
  {
    path: 'participar',
    loadChildren: () => import('./pages/participar/participar.module').then(m => m.ParticiparPageModule)
  },
  {
    path: 'pag-inicial',
    loadChildren: () => import('./pages/pag-inicial/pag-inicial.module').then(m => m.PagInicialPageModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./pages/contato/contato.module').then( m => m.ContatoPageModule)
  },
  {
    path: 'detail-participar',
    loadChildren: () => import('./pages/detail-participar/detail-participar.module').then( m => m.DetailParticiparPageModule)
  },

  {
    path: 'detail-participar/:id',
    loadChildren: () => import('./pages/detail-participar/detail-participar.module').then( m => m.DetailParticiparPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
