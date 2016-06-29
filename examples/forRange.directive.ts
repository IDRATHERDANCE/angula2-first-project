import { Directive, Input, TemplateRef, ViewContainerRef, View, EmbeddedViewRef } from '@angular/core';


    @Directive({
        selector: '[forRange]'
        })


export class ForRangeDirective {
    
    @Input() set forRange(value:number){
        this.render(value)
    }
    
contructor(private _templateRef:TemplateRef, private _viewContainer:ViewContainerRef){}

render(range:number){
    
for(let i = 0; i < range; i++){
    
    var view:EmbeddedViewRef = this._viewContainer.createEmbeddedView(this._templateRef, i);
    
    view.setLocal('index', i)
}
}    
    
    
}