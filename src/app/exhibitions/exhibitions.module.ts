import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

import { ExhibitionsComponent } from './exhibitions.component';

import { exhibitionsRoutes } from './exhibitions.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    exhibitionsRoutes
  ],
  declarations: [ ExhibitionsComponent ]
})
export class ExhibitionsModule {}
