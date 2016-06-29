import {Component, OnInit} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import {HttpgetService} from '../../common.services/httpget.service';
import {ProjectComponent} from './projects/project.component';
import {SubMenuPipe} from '../../common.services/subMenu.pipe';

    @Component({
        selector: 'work-component',
        moduleId: module.id,
        templateUrl: './template/work.template.html',
        providers: [HttpgetService, ProjectComponent],
         host: {'class': 'ng-animate view'},
         directives: [ROUTER_DIRECTIVES],
         pipes: [SubMenuPipe]
        })


export class WorkComponent implements OnInit {
    
    constructor (private httpgetService:HttpgetService) {}
  
    ngOnInit() {
        this.getSortedData();
    }  
    
    getSortedData(){
       this.httpgetService.getApiData() 
            .subscribe(response => this.data = response) 
    }
 }