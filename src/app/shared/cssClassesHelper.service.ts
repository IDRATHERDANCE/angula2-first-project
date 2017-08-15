import { Injectable } from '@angular/core';


@Injectable()

export class CssClassesHelper {

constructor() {}

    whenIsHidden(_this) {
         
        return (
                (
                !(_this.hasPosition && _this._imgLoad && _this.isItNews) 
                || !(_this.hasPosition && _this._imgLoad && _this.isItNews && (_this._tooTallFlag || window.innerWidth <= 736))
                ) 
                && !(_this._imgLoad && !_this.isItNews)
                );
    }
    
    hiddenElClasse(_this) {
       return {
           'widerBox': !_this.isPortWider, 
           'andPort': _this.port, 
           'iframeHidden': !_this.currentIfame
        }
    }

    popWrapClasses(_this) {
        return {
            'portrait': _this.wider && !_this.isItNews, 
            'landscape': !_this.wider && !_this.isItNews,
            'portNews': ((_this.widerNews && _this.isItNews) || _this.port) && !_this._iframeAndDown, 
            'portNewsWider': _this.widerNews && _this.isItNews && _this.isPortWider, 
            'landNews': (!_this.widerNews && _this.isItNews && !_this.port) || _this._iframeAndDown, 
            'tooTall': (!_this.widerNews && _this.isItNews && _this.isItTooTall && !_this.port) || _this._iframeAndDown,
            'popWrapIframe': !!_this.currentIfame && !_this.currentPhoto
        }
    }

    mediaDivClasses(_this) {
        return {
            'longText': _this.down || _this._iframeAndDown,
            'madiaIframe': !!_this.currentIfame && !_this.currentPhoto, 
            'portMedia': ((_this.widerNews && _this.isItNews) || _this.port) && !_this._iframeAndDown,
            'portWider': _this.widerNews && _this.isItNews && _this.isPortWider
        }
    }

    imgClasses(_this) {
        return { 
            'imgPort': (_this.wider && !_this.isItNews) || (_this.widerNews && _this.isItNews) || _this.port, 
            'imgPortWider': _this.widerNews && _this.isItNews && _this.isPortWider 
        }
    }
    ratioClasses(_this) {
        return { 'widerRatio': (_this.widerNews && _this.isItNews) || _this.port }
    }
    
    iframeClasses(_this) {
        return { 'widerIframe': (_this.widerNews && _this.isItNews) || _this.port }
    }

    textDivClasses(_this) {
        return { 
            'land': !_this.wider && !_this.isItNews && !_this.currentIfame, 
            'portIframe': !!_this.currentIfame
        }
    }

    newsTextClasses(_this) {
        return {
            'down': (_this.down && !_this.port) || _this._iframeAndDown, 
            'up': (!_this.down || _this.port) && !_this._iframeAndDown, 
            'widerBox': !_this.isPortWider, 
            'andPort': _this.port
        }
    }
}
