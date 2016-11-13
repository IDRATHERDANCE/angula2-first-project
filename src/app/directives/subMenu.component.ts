import { Component, Input } from '@angular/core';

    @Component({
        selector: 'my-submenu-directive',
        template: `
        <div id="sub_menu">
            <li *ngFor="let item of menuData" ><a [routerLink]="['work/' + item]">{{item}}</a></li>
        </div>
        `
         })

export class SubMenuComponent {

@Input() isItWork: Boolean;
@Input() menuData: Array<string>; 

}
