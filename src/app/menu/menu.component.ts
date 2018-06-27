import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core'; 

import { fadeIn } from '../shared/fadeIn.animation';
import { TopService } from '../shared/top.service';


@Component({
  selector: 'menu',// tslint:disable-line
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
  animations: [fadeIn()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent implements OnChanges {
  
    @Input() subMenuArray: Array<Object>;
    @Input() popIsUpFlag: boolean;
    @Input() isItSplashValue: boolean;
    @Input() isItWorkValue: boolean;
    @Input() haveSubmenuFlag: boolean;

    public maxHeight: string;
    public top: string;

    constructor(public topService: TopService) {}

    ngOnChanges() {
      const fire = this.topService.isFirefox();
      const subs = this.subMenuArray.length;
      const calcHeight = fire ? (subs + 1) * 1.5 : subs * 1.5;
      const upOrDown = this.isItWorkValue && this.haveSubmenuFlag;
      this.maxHeight = upOrDown ? calcHeight + 'rem' : '0rem';
      const calcTop = fire ? (subs * 1.5) + 3.5 : (subs * 1.5) + 1.5;
      this.top = upOrDown ? calcTop + 'rem' : '1.3rem';
    }

}
