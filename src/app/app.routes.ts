import { Routes } from '@angular/router';
import { FrontOffice } from './pages/front-office/front-office';
import { BackOffice } from './pages/back-office/back-office';

export const routes: Routes = [
  {
    path: '',
    component: FrontOffice,
  },
  {
    path: 'utgloffice',
    component: BackOffice,
  },
];
