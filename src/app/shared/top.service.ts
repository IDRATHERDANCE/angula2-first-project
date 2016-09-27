import { Injectable } from '@angular/core';

@Injectable()

export class TopService {



constructor() {}

setTop(_elements, _renderer) {
    setTimeout(() => { _elements.map(item =>  _renderer.setElementProperty(item, 'scrollTop', 0)); }, 0);
}

}
