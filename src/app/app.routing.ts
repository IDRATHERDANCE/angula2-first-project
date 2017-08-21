import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: '', loadChildren: './splash/splash.module#SplashModule'},
    { path: 'work', loadChildren: './work/work.module#WorkModule'},
    { path: 'news', loadChildren: './news/news.module#NewsModule'},
    { path: 'press', loadChildren: './press/press.module#PressModule'},
    { path: 'exhibitions', loadChildren: './exhibitions/exhibitions.module#ExhibitionsModule'},
    { path: 'about', loadChildren: './about/about.module#AboutModule'},
    { path: 'contact', loadChildren: './contact/contact.module#ContactModule'}
];

export const routing = RouterModule.forRoot(routes);
