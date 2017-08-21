import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

import { PressComponent } from './press.component';

import { pressRoutes } from './press.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    pressRoutes
  ],
  declarations: [ PressComponent ]
})
export class PressModule {}