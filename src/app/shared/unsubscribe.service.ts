import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()

export class UnsubscribeService {

constructor() {}

    unsubscribe(classN) {  
        Object.keys(classN).map(item => { 
            if (classN[item] && classN[item].constructor === Subscriber) {
                classN[item].unsubscribe();
            }
        });
    }

}
