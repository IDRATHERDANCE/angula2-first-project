import { RouterConfig } from '@angular/router';

import {ExhibitionsComponent} from './exhibitions.component';
import {ExhibitionsViewComponent} from './exhibitions.view.component';


export const ExhibitionsRoutes: RouterConfig = [
  {
    path: 'exhibitions',
    component: ExhibitionsViewComponent,
    children: [
        { path: '',  component: ExhibitionsComponent },
        { path: ':exhibition', component: ExhibitionsComponent }
    ]
  }
];


