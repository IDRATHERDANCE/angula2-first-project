import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()

export class TopService {



constructor( @Inject(DOCUMENT) private _document) {}

    setTop(renderer) {
        let body = this._document.body,
            html = this._document.documentElement; 
                
            if (body.scrollTop === 0) return;
                [body, html].map(item => renderer.setElementProperty(item, 'scrollTop', 0)); 

    }

}
