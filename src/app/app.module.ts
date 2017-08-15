import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from "@angular/router";

import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { SplashComponent } from './splash/splash.component';
import { ContactComponent } from './contact/contact.component';
import { WorkComponent } from './work/work.component';
import { ProjectComponent } from './projects/project.component';
import { NewsComponent } from './news/news.component';
import { PressComponent } from './press/press.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { CarouselComponent } from './carousel/carousel.directive';
import { PopUpInitComponent } from './popup/popup.component';
import { SubMenuComponent } from './submenu/subMenu.component';

import { ColumnsDirective } from './column.directive/columns.directive';
import { OrientationDirective } from './orientation.directive/orientation.directive';

import { SubMenuPipe } from './shared/subMenu.pipe';
import { StyleRemove } from './shared/styleRemove.pipe';

import { HttpgetService } from './shared/httpget.service';
import { TopService } from './shared/top.service';
import { RemoveEmptyLines } from './shared/removeEmptyLines.service';
import { ResizeWindow } from './shared/resize.service';
import { PrepareObj } from './shared/prepareObjects.service';
import { UnsubscribeService } from './shared/unsubscribe.service';
import { CssClassesHelper } from './shared/cssClassesHelper.service';

import { routing } from './app.routing';
import { DataActions } from '../actions/data-actions';
import { CustomReuseStrategy } from "./shared/customReuseStrategy";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    routing,
    NgReduxModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    SplashComponent,
    ContactComponent,
    WorkComponent,
    ProjectComponent,
    NewsComponent,
    PressComponent,
    ExhibitionsComponent,
    SubMenuComponent,
    PopUpInitComponent,
    ColumnsDirective,
    CarouselComponent,
    OrientationDirective,
    SubMenuPipe,
    StyleRemove
  ],
  providers: [
    HttpgetService,
    TopService,
    DevToolsExtension,
    DataActions,
    RemoveEmptyLines,
    ResizeWindow,
    PrepareObj,
    UnsubscribeService,
    CssClassesHelper,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}