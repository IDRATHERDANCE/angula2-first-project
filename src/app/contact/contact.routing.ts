import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';

export const aboutRoutes = 
    RouterModule.forChild([
        { path: '', component: ContactComponent, pathMatch: 'full'}
    ]);




