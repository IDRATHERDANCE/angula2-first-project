import {Component, OnInit} from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import {Location} from "@angular/common";


import {HttpgetService} from '../common.services/httpget.service';
import {SubMenuPipe} from '../common.services/subMenu.pipe';


    @Component({
        selector: 'subMenu-directive',
        providers: [HttpgetService],
        template: `
        <div id="sub_menu">
            <li *ngFor="let item of data"><a [routerLink]="['work/', item.title.toLowerCase() | submenupipe]">{{item.title}}</a></li>
        </div>
        `,
        directives: [ROUTER_DIRECTIVES],
        pipes: [SubMenuPipe]
         })

export class SubMenuDirective implements OnInit{
    
constructor (private httpgetService:HttpgetService, public location: Location, private router: Router) {
    this.router.changes.subscribe(() => this.getSubMenuData()); 
}

    
ngOnInit(){this.getSubMenuData()}    
    
getSubMenuData(){ 
  if (this.location.path().indexOf('/work')>-1){ 
       this.httpgetService.getApiData()
            .subscribe(
                response => this.data = response
            ) 
    }
}


    
}