import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

import { WorkComponent } from './work.component';
import { ProjectComponent } from '../projects/project.component';
import { OrientationDirective } from '../orientation/orientation.directive';
import { CarouselComponent } from '../carousel/carousel.directive';
import { workRoutes } from './work.routing';
import { SubMenuPipe } from '../shared/subMenu.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    workRoutes
  ],
  declarations: [ 
    WorkComponent,
    ProjectComponent,
    OrientationDirective,
    CarouselComponent,
    SubMenuPipe
  ]
})
export class WorkModule {}
