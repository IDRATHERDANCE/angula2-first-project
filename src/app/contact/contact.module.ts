import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './contact.component';
import { aboutRoutes } from './contact.routing';

@NgModule({
  imports: [
    CommonModule,
    aboutRoutes
  ],
  declarations: [ ContactComponent ]
})
export class ContactModule {}
