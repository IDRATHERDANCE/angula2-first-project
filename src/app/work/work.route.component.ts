import { RouterConfig } from '@angular/router';

import {ProjectComponent} from './projects/project.component';
import {WorkComponent} from './work.component';
 import {WorkViewComponent} from './work.view.component';


 export const WorkRoutes: RouterConfig = [
  {
    path: 'work',
    component: WorkViewComponent,
    children: [
        { path: '',  component: WorkComponent },
        { path: ':project', component: ProjectComponent }
    ]
  }
 ];
