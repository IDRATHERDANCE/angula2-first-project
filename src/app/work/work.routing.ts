import { RouterModule, Routes } from '@angular/router';
import { WorkComponent } from './work.component';
import { ProjectComponent } from '../projects/project.component';

export const workRoutes =
    RouterModule.forChild([
        { path: '', component: WorkComponent, pathMatch: 'full'},
        { path: ':project', component: ProjectComponent }
    ]);



