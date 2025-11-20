import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: Home,
    data: { icon: 'home' },
  },
  {
    title: 'Avatar',
    path: 'avatar',
    loadComponent: () => import('./avatar/avatar'),
    data: { icon: 'face' },
  },
  {
    title: 'Icon',
    path: 'icon',
    loadComponent: () => import('./icon/icon'),
    data: { icon: 'rocket' },
  },
  {
    title: 'Markdown',
    path: 'markdown',
    loadComponent: () => import('./markdown/markdown'),
    data: { icon: 'markdown' },
  },
  {
    title: 'Material colors',
    path: 'material-colors',
    loadComponent: () => import('./material-colors/material-colors'),
    data: { icon: 'palette' },
  },
  {
    title: 'Material components',
    path: 'material-components',
    loadComponent: () => import('./material-components/material-components'),
    data: { icon: 'widgets' },
  },
];
