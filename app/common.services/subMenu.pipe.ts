import {Pipe, PipeTransform} from '@angular/core';

    @Pipe({name: 'submenupipe'})



export class SubMenuPipe implements PipeTransform{
transform(value: string):string {
    return value.replace(/\s+/g, '-').toLowerCase()
}
    
}
    
    
  