import {Component, OnInit} from '@angular/core';

import { Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

import {HttpgetService} from '../../common.services/httpget.service';

    @Component({
        selector: 'splash-component',
        moduleId: module.id,
        templateUrl: './template/splash.template.html',
        providers: [HttpgetService],

         host: {'class' : 'ng-animate view'},
        directives: [ROUTER_DIRECTIVES]
        
        
        })

export class SplashComponent implements OnInit {
    
    constructor (private httpgetService:HttpgetService) {}
      
  
    ngOnInit() {
        this.getSortedData();
    }  
     
    getSortedData(){
  
       this.httpgetService.getApiData()
            .subscribe(
                response => { 
                    this.splashlogo = response[0].meta.splash_logo,
                    this.splashText = response[0].content,    
                    this.splash = {
                         backgroundImage: 'url("' + response[0].meta.splash_photo + '")'
                    }
                }

            ) 
        this.spinner = 'images/spinner.gif'
    }
}


