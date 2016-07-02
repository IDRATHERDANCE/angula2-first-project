import { Component, OnInit, HostBinding } from '@angular/core';

import { HttpgetService } from '../common.services/httpget.service';

    @Component({
        selector: 'my-contact-component',
        moduleId: module.id,
        template: require('./contact.template.html'),
        providers: [HttpgetService]
        })

export class ContactComponent implements OnInit {

@HostBinding('class') class = 'ng-animate view';

private data: Object;

constructor (private httpgetService: HttpgetService) {}

    ngOnInit() {
        this.getSortedData();
    }

    getSortedData() {

       this.httpgetService.getApiData('contact')
            .subscribe(
                response => {
                this.data = response[0].content;
                }
            );
    }

}
