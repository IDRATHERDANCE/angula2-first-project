import { RouterModule, Routes } from '@angular/router';

import { SplashComponent } from './splash/splash.component';
import { WorkComponent } from './work/work.component';
import { NewsComponent } from './news/news.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { PressComponent } from './press/press.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectComponent } from './work/projects/project.component';


const routes: Routes = [
    {path: '', component: SplashComponent},
    {path: 'work', component: WorkComponent},
    {path: 'work/:project', component: ProjectComponent},
    {path: 'news', component: NewsComponent},
    {path: 'news/:single', component: NewsComponent},
    {path: 'press', component: PressComponent},
    {path: 'press/:article', component: PressComponent},
    {path: 'exhibitions', component: ExhibitionsComponent},
    {path: 'exhibitions/:exhibition', component: ExhibitionsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent}
];

export const routing = RouterModule.forRoot(routes);
