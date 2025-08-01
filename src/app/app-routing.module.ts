import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
   {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
 
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tab1', 
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule) 
  },
  { path: 'tab6', 
    loadChildren: () => import('./tab6/tab6.module').then(m => m.Tab6PageModule) 
  },
 
  // {
  //   path: 'tab4',
  //   loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  // },
  // {
  //   path: 'tab5',
  //   loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
