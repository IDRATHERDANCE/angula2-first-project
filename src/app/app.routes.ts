import { provideRouter, RouterConfig } from '@angular/router';


import { SplashComponent } from './splash';
import { WorkRoutes } from './work';
import { NewsRoutes } from './news';
import { ExhibitionsRoutes } from './exhibitions';
import { PressRoutes } from './press';
import { AboutComponent } from './about';
import { ContactComponent } from './contact';


export const routes: RouterConfig = [
    {path: '', component: SplashComponent},
    ...WorkRoutes,
    ...NewsRoutes,
    ...ExhibitionsRoutes,
    ...PressRoutes,
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
