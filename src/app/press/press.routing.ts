import { RouterModule, Routes } from '@angular/router';
import { PressComponent } from './press.component';


export const pressRoutes = 
    RouterModule.forChild([
        { path: '', component: PressComponent, pathMatch: 'full'},
        { path: ':article', component: PressComponent }
    ]);



