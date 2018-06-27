import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './shared/customReuseStrategy';

import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { DataActions } from '../actions/data-actions';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SubMenuComponent } from './submenu/subMenu.component';
import { MenuComponent } from './menu/menu.component';

import { HttpgetService } from './shared/httpget.service';
import { TopService } from './shared/top.service';
import { CommonCalls } from './shared/commonCalls.service';
import { PrepareObj } from './shared/prepareObjects.service';
import { RemoveEmptyLines } from './shared/removeEmptyLines.service';
import { ResizeWindow } from './shared/resize.service';
import { CssClassesHelper } from './shared/cssClassesHelper.service';
import { SubMenuPrettyPipe } from './shared/submenuPretty.pipe';


import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

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
    SubMenuComponent,
    MenuComponent,
    SubMenuPrettyPipe
  ],
  providers: [
    HttpgetService,
    TopService,
    DevToolsExtension,
    DataActions,
    CommonCalls,
    PrepareObj,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
