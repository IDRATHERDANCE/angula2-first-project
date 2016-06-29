import {Component, OnInit} from '@angular/core';

import {HttpgetService} from '../../common.services/httpget.service';

   
    @Component({
        selector: 'contact-component',
        moduleId: module.id,
        templateUrl: './template/about.template.html',
        providers: [HttpgetService],
        
            host: {'class' : 'ng-animate view'}
        
        })

export class AboutComponent implements OnInit{
    
constructor (private httpgetService:HttpgetService) {}
      
  
    ngOnInit() {
        this.getSortedData();
    }  
    
    
    getSortedData(){
  
       this.httpgetService.getApiData()
    .subscribe( 
                response => {
                        this.pageContent = response[0].content,
                        this.aboutPhoto = response[0].meta.about_photo,
                        this.columnRight = response[0].meta.column_right
                 }
            ) 
    }
  
  

    
}