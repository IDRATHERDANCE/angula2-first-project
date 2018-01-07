import { Component, Input, ChangeDetectionStrategy } from '@angular/core'; 

import { fadeIn } from '../shared/fadeIn.animation';


@Component({
  selector: 'menu',// tslint:disable-line
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
  animations: [fadeIn()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent {

    @Input() subMenuArray: Array<Object>;
    @Input() popIsUpFlag: boolean;
    @Input() isItSplashValue: boolean;
    @Input() isItWorkValue: boolean;
    @Input() haveSubmenuFlag: boolean;

}
