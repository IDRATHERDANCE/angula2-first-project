import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';



import {NewsComponent} from './news.component';



    @Component({
        selector: 'news-route-component',
        providers: [NewsComponent],
        template: `
        <router-outlet></router-outlet>
        `,
        directives: [ROUTER_DIRECTIVES]
        
        })



@Routes([
    { path: '/', component: NewsComponent }, 
    { path: '/:news', component: NewsComponent }
])

export class NewsRouteComponent { 

}