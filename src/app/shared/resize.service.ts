import { Injectable } from '@angular/core';

@Injectable()

export class ResizeWindow {

  winResize(callback) {
    window.addEventListener('resize', function() {
        callback();
    });
  }

  isItPhone() {
    return window.innerWidth >= 736 ? false : true;
  }

  dataTrimmed(response) {
    return this.isItPhone() ? Array.of(response[0]) : response;
  }

}