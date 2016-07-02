import { Component, OnChanges, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Location } from '@angular/common';


import { HttpgetService } from '../common.services/httpget.service';
import { SubMenuPipe } from '../common.services/subMenu.pipe';



    @Component({
        selector: 'my-submenu-directive',
        providers: [ HttpgetService ],
        template: `
        <div id="sub_menu">
            <li *ngFor="let item of data"><a [routerLink]="['/', 'work/'+item.title.toLowerCase() | mySubMenuPipe]">{{item.title}}</a></li>
        </div>
        `,
        directives: [ ROUTER_DIRECTIVES ],
        pipes: [ SubMenuPipe ]
         })

export class SubMenuComponent implements OnChanges {

@Input() isItWork: Boolean;

private data: Object;

constructor (private httpgetService: HttpgetService, public location: Location) {}

ngOnChanges() {
    if (this.isItWork) {
       this.httpgetService.getApiData('work')
            .subscribe(response => this.data = response);
    }
}

}
