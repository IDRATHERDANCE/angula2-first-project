import { Component, OnInit, HostBinding } from '@angular/core';

import { HttpgetService } from '../common.services/httpget.service';

    @Component({
        selector: 'my-about-component',
        moduleId: module.id,
        template: require('./about.template.html'),
        providers: [HttpgetService]
        })

export class AboutComponent implements OnInit {

@HostBinding('class') class = 'ng-animate view';

private pageContent: any;
private aboutPhoto: any;
private columnRight: any;

constructor (private httpgetService: HttpgetService) {}

    ngOnInit() {
        this.getSortedData();
    }

    getSortedData() {

       this.httpgetService.getApiData('about')
            .subscribe(
                response => {
                        this.pageContent = response[0].content;
                        this.aboutPhoto = response[0].meta.about_photo;
                        this.columnRight = response[0].meta.column_right;
                 }
            );
    }
}
