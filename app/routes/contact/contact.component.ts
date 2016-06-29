import {Component, OnInit} from '@angular/core';

import {HttpgetService} from '../../common.services/httpget.service';

   
    @Component({
        selector: 'contact-component',
        moduleId: module.id,
        templateUrl: './template/contact.template.html',
        providers: [HttpgetService],
        host: {'class' : 'ng-animate view'}
        })

export class ContactComponent implements OnInit {
    
constructor (private httpgetService:HttpgetService) {}
      
  
    ngOnInit() {
        this.getSortedData();
    }  
    
    
    getSortedData(){
  
       this.httpgetService.getApiData()
            .subscribe(
                response => { 
                this.data = response[0].content
                }

            ) 
    }
  
 

    
}