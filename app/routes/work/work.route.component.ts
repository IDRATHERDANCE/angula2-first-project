import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';


import {ProjectComponent} from './projects/project.component';
import {WorkComponent} from './work.component';



    @Component({
        selector: 'work-route-component',
        providers: [WorkComponent, ProjectComponent],
        template: `
        <router-outlet></router-outlet>
        `,
        directives: [ROUTER_DIRECTIVES]
        
        })



@Routes([
    { path: '/', component: WorkComponent }, 
    { path: '/:project', component: ProjectComponent }
])

export class WorkRouteComponent { 

}