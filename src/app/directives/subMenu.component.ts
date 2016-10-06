import { Component, Input } from '@angular/core';

    @Component({
        selector: 'my-submenu-directive',
        template: `
        <div id="sub_menu">
            <li><a [routerLink]="['work/animal']">animal</a></li>
            <li><a [routerLink]="['work/taurus']">taurus</a></li>
            <li><a [routerLink]="['work/second-surface']">second surface</a></li>
            <li><a [routerLink]="['work/ykk-piece']">ykk piece</a></li>
            <li><a [routerLink]="['work/blind-nude']">blind nude</a></li>
            <li><a [routerLink]="['work/skirt-up']">skirt up</a></li>
            <li><a [routerLink]="['work/unhuman']">unhuman</a></li>
            <li><a [routerLink]="['work/wired']">wired</a></li>
        </div>
        `
         })

export class SubMenuComponent {

@Input() isItWork: Boolean;

constructor () {}


}

