
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.Guards';
import { registerGuard } from './core/guards/register.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth', loadComponent: () => import('./layout/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),

    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then((c) => c.RegisterComponent),
        canDeactivate: [registerGuard],
      }
    ]

  },



  {
    path: 'user', loadComponent: () => import('./layout/user-layout/user-layout.component').then((c) => c.UserLayoutComponent),

    canActivate: [authGuard],
    children: [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'cart/:id',
        loadComponent: () => import('./pages/cart/cart.component').then((c) => c.CartComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then((c) => c.ProductsComponent),
      },
      {
        path: 'detalis',
        loadComponent: () => import('./pages/detalis/detalis.component').then((c) => c.DetalisComponent),
      },
      {
        path: 'categoty',
        loadComponent: () => import('./pages/category/category.component').then((c) => c.CategoryComponent),
      }

    ]

  },

]
