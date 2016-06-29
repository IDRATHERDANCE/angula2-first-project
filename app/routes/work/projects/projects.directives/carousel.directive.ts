import {Directive, Input, EventEmitter, Output, OnChanges } from '@angular/core';


@Directive ({
    selector: '[carousel]'
   })

export class CarouselDirective implements OnChanges {
    
    @Input() carouselLenght: number;
    @Input() count: number; 
    @Output() translateC = new EventEmitter<string>();    
    @Output() noMorePhotosL = new EventEmitter<boolean>();    
    @Output() noMorePhotosR = new EventEmitter<boolean>();    

constructor () {}
    
ngOnChanges(){
   if (this.carouselLenght!==undefined){
        this.moveCarousel(this.count, this.carouselLenght)
    }
}   

    
moveCarousel(counter, length){
    
    let multiplyer: number = 1; 
    
        if (length > 5){
            multiplyer = 2;
            
            if (counter===0){
                this.noMorePhotosL.emit(true); 
                this.noMorePhotosR.emit(false); 
                } else {
                    this.noMorePhotosL.emit(false);
                } 

                if (Math.ceil(length/4)===counter){
                    this.noMorePhotosR.emit(true);
                }

            if (this.isOdd(length)) {
                    if (Math.ceil(length/4)===counter){
                       multiplyer = 2.25;
                    }
                } 

        }
    
    let moveTimes = counter * multiplyer * -26.5;
    this.translateC.emit('translateX(' + moveTimes + '%)');
   
}    
    
isOdd(num) { return num % 2; }
 
}