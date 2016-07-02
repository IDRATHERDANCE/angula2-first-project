import { Component, OnInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HttpgetService } from '../common.services/httpget.service';
import { ProjectComponent } from './projects/project.component';
import { SubMenuPipe } from '../common.services/subMenu.pipe';

    @Component({
        selector: 'my-work-component',
        moduleId: module.id,
        template: require('./work.template.html'),
        providers: [HttpgetService, ProjectComponent],
        directives: [ROUTER_DIRECTIVES],
        pipes: [SubMenuPipe]
        })

export class WorkComponent implements OnInit {

@HostBinding('class') class = 'ng-animate view';

private data: Object;

constructor (private httpgetService: HttpgetService) {}

    ngOnInit() {
        this.getSortedData();
    }

    getSortedData() {
       this.httpgetService.getApiData('work')
            .subscribe(response => this.data = response);
    }
 }
