import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({name: 'subMenuPretty'})

export class SubMenuPrettyPipe implements PipeTransform {
transform(value: string): string {
    return value.replace(/\-/g, ' ').toLowerCase();
}

}
