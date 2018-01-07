import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashComponent } from './splash.component';
import { splashRoutes } from './splash.routing';

@NgModule({
  imports: [
    CommonModule,
    splashRoutes
  ],
  declarations: [ SplashComponent ]
})
export class SplashModule {}
