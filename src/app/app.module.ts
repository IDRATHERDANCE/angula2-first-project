import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy } from "@angular/router";
import { CustomReuseStrategy } from "./shared/customReuseStrategy";

import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { DataActions } from '../actions/data-actions';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SubMenuComponent } from './submenu/subMenu.component';

import { HttpgetService } from './shared/httpget.service';
import { UnsubscribeService } from './shared/unsubscribe.service';
import { TopService } from './shared/top.service';

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
    SubMenuComponent
  ],
  providers: [
    HttpgetService,
    TopService,
    DevToolsExtension,
    DataActions,
    UnsubscribeService,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}