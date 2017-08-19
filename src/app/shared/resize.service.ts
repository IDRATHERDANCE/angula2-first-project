import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Injectable()

export class ResizeWindow {

  constructor(private _eventManager: EventManager) {}

  winResize(callback) {
    this._eventManager.addGlobalEventListener('window', 'resize', callback);
  }

  isItPhone() {
    return window.innerWidth >= 736 ? false : true;
  }

  dataTrimmed(response) {
    return this.isItPhone() ? Array.of(response[0]) : response;
  }

}