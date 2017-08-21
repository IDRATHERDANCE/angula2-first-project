import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { StyleRemove } from '../shared/styleRemove.pipe';

import { NewsComponent } from './news.component';


import { newsRoutes } from './news.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    newsRoutes
  ],
  declarations: [ 
    NewsComponent,
    StyleRemove
  ]
})
export class NewsModule {}