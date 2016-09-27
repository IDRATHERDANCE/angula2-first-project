import { Component, Input, OnChanges } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';
import { CacheService } from '../shared/cache.service';

    @Component({
        selector: 'my-submenu-directive',
        template: `
        <div id="sub_menu">
            <li *ngFor="let item of data"><a [routerLink]="['work/', item.title.toLowerCase() | mySubMenuPipe]">{{item.title}}</a></li>
        </div>
        `
         })

export class SubMenuComponent implements OnChanges {

@Input() isItWork: Boolean;

private data: Object;

constructor (private _httpgetService: HttpgetService, private _cacheService: CacheService) {}

ngOnChanges() {
    if (this.isItWork) {
       this.getSortedData();
    }
}

getSortedData() {

    if (this._cacheService.isItChached()) {
        this.callToPopulate(this._cacheService.isItChached());
    } else {
        this._httpgetService.getApiData()
        .subscribe(
            response => {
                    this.callToPopulate(response);
                    this._cacheService.cache(response);
                    }
                );
    }
}

callToPopulate(response) {
    this.data = response;
}

}

