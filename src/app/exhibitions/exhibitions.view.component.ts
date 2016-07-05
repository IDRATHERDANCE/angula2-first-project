import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


    @Component({
        selector: 'my-exhibitions-view',
        template: '<router-outlet></router-outlet>',
        directives: [ROUTER_DIRECTIVES]

        })



export class ExhibitionsViewComponent {}
