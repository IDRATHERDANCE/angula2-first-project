import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';


export const newsRoutes =
    RouterModule.forChild([
        { path: '', component: NewsComponent, pathMatch: 'full'},
        { path: ':single', component: NewsComponent }
    ]);



