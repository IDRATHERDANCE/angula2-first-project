import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';



import {PressComponent} from './press.component';



    @Component({
        selector: 'press-route-component',
        providers: [PressComponent],
        template: `
        <router-outlet></router-outlet>
        `,
        directives: [ROUTER_DIRECTIVES]
        
        })



@Routes([
    { path: '/', component: PressComponent }, 
    { path: '/:press', component: PressComponent }
])

export class PressRouteComponent { 

}