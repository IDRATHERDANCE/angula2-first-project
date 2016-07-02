import { RouterConfig } from '@angular/router';

import {NewsComponent} from './news.component';
import {NewsViewComponent} from './news.view.component';


export const NewsRoutes: RouterConfig = [
  {
    path: 'news',
    component: NewsViewComponent,
    children: [
        { path: '',  component: NewsComponent },
        { path: ':new', component: NewsComponent }
    ]
  }
];



