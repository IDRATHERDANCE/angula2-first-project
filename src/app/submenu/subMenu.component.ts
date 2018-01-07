import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

    @Component({
        selector: 'submenu',
        styleUrls: ['./submenu.component.scss'],
        templateUrl: './submenu.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    })

export class SubMenuComponent {

    @Input() isItWork: Boolean;
    @Input() menuData: Array<string>; 

}
