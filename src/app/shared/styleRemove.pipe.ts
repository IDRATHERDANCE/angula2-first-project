import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({name: 'StyleRemove'})

export class StyleRemove implements PipeTransform {
transform(value: string): string {
    return value.replace(/style=.*"/g, '').replace(/<em>/g, '').replace(/<\/em>/g, '');
}

}
