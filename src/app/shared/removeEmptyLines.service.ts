import { Injectable } from '@angular/core';

@Injectable()

export class RemoveEmptyLines {

    removeLines(textString) {
        return textString.replace(/&nbsp;/g,'').replace(/<p><\/p>/g,'')
    }

}

