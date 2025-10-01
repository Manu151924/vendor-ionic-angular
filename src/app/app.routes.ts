import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'delivery',
    loadComponent: () => import('./pages/delivery/delivery.page').then( m => m.DeliveryPage)
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking.page').then( m => m.BookingPage)
  },
];
