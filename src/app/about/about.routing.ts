import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

export const aboutRoutes = 
    RouterModule.forChild([
        { path: '', component: AboutComponent, pathMatch: 'full'}
    ]);




