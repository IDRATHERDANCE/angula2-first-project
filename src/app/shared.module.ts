import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopUpInitComponent } from './popup/popup.component';
import { ColumnsDirective } from './column.directive/columns.directive';

import { RemoveEmptyLines } from './shared/removeEmptyLines.service';
import { ResizeWindow } from './shared/resize.service';
import { PrepareObj } from './shared/prepareObjects.service';
import { CssClassesHelper } from './shared/cssClassesHelper.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopUpInitComponent,
    ColumnsDirective,
  ],
  providers: [
    RemoveEmptyLines,
    ResizeWindow,
    PrepareObj,
    CssClassesHelper
  ],
  exports: [PopUpInitComponent, ColumnsDirective]
})

export class SharedModule {}