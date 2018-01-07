import { Injectable } from '@angular/core';

@Injectable()

export class TopServiceMock {

constructor() {}

    setTop() {
        return 'scrolled to top'
    }

}
