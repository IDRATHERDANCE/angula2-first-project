
import { Injectable } from '@angular/core';



@Injectable()
export class HttpGetService {
  
  user:Object<any>;

  constructor() {
    this.user = 
    { firstName: 'Christoph', lastName: 'Burgdorf'  }

    
  }  
    
  getUser() {
    return this.user;
  }
}