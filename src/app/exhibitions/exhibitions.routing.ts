import { RouterModule, Routes } from '@angular/router';
import { ExhibitionsComponent } from './exhibitions.component';


export const exhibitionsRoutes = 
    RouterModule.forChild([
        { path: '', component: ExhibitionsComponent, pathMatch: 'full'},
        { path: ':exhibition', component: ExhibitionsComponent }
    ]);



