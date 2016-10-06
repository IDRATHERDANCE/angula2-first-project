import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { SplashComponent } from './splash/splash.component';
import { ContactComponent } from './contact/contact.component';
import { WorkComponent } from './work/work.component';
import { ProjectComponent } from './work/projects/project.component';
import { NewsComponent } from './news/news.component';
import { PressComponent } from './press/press.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';

import { PopUpInitComponent } from './directives/popup.component';
import { SubMenuComponent } from './directives/subMenu.component';
import { ColumnsDirective } from './news/news.directives/columns.directive';
import { OrientationDirective } from './work/projects/projects.directives/orientation.directive';
import { CarouselComponent } from './work/projects/projects.directives/carousel.directive';


import { SubMenuPipe } from './shared/subMenu.pipe';
import { StyleRemove } from './shared/styleRemove.pipe';

import { HttpgetService } from './shared/httpget.service';
import { CacheService } from './shared/cache.service';
import { TopService } from './shared/top.service';
import { NG2_WEBSTORAGE } from 'ng2-webstorage';
import { routing } from './app.routing';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
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
    OrientationDirective,
    CarouselComponent,

    SubMenuPipe,
    StyleRemove
  ],
  providers: [
    HttpgetService,
    CacheService,
    NG2_WEBSTORAGE,
    TopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}
