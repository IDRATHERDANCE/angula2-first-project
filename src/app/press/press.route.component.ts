import { RouterConfig } from '@angular/router';

import {PressComponent} from './press.component';
import {PressViewComponent} from './press.view.component';


export const PressRoutes: RouterConfig = [
  {
    path: 'press',
    component: PressViewComponent,
    children: [
        { path: '',  component: PressComponent },
        { path: ':singlepress', component: PressComponent }
    ]
  }
];


