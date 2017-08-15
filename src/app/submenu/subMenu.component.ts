import { Component, Input } from '@angular/core';

    @Component({
        selector: 'submenu',
        styleUrls: ['./submenu.component.scss'],
        templateUrl: './submenu.component.html'
    })

export class SubMenuComponent {

    @Input() isItWork: Boolean;
    @Input() menuData: Array<string>; 

}
