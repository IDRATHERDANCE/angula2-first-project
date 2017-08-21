import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './splash.component';

export const splashRoutes = 
    RouterModule.forChild([
        { path: '', component: SplashComponent, pathMatch: 'full'}
    ]);




