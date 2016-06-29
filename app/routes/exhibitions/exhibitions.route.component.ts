import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';



import {ExhibitionsComponent} from './exhibitions.component';



    @Component({
        selector: 'exhibitions-route-component',
        providers: [ExhibitionsComponent],
        template: `
        <router-outlet></router-outlet>
        `,
        directives: [ROUTER_DIRECTIVES]
        
        })



@Routes([
    { path: '/', component: ExhibitionsComponent }, 
    { path: '/:exhibition', component: ExhibitionsComponent }
])

export class ExhibitionsRouteComponent { 

}