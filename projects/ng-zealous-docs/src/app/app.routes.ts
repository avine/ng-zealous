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
    title: 'Alert',
    path: 'alert',
    loadComponent: () => import('./alert/alert'),
    data: { icon: 'info' },
  },
  {
    title: 'Avatar',
    path: 'avatar',
    loadComponent: () => import('./avatar/avatar'),
    data: { icon: 'face' },
  },
  {
    title: 'Breakpoint',
    path: 'breakpoint',
    loadComponent: () => import('./breakpoint/breakpoint'),
    data: { icon: 'fit_width' },
  },
  {
    title: 'Burger',
    path: 'burger',
    loadComponent: () => import('./burger/burger'),
    data: { icon: 'lunch_dining' },
  },
  {
    title: 'Button',
    path: 'button',
    loadComponent: () => import('./button/button'),
    data: { icon: 'web_traffic' },
  },
  {
    title: 'Button group',
    path: 'button-group',
    loadComponent: () => import('./button-group/button-group'),
    data: { icon: 'gamepad' },
  },
  {
    title: 'Icon',
    path: 'icon',
    loadComponent: () => import('./icon/icon'),
    data: { icon: 'rocket' },
  },
  {
    title: 'List more',
    path: 'list-more',
    loadComponent: () => import('./list-more/list-more'),
    data: { icon: 'read_more' },
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
  {
    title: 'Pretty',
    path: 'pretty',
    loadComponent: () => import('./pretty/pretty'),
    data: { icon: 'code' },
  },
];
