import { Component } from '@angular/core';
import {Location} from "@angular/common";
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';


import { SplashComponent }    from './routes/splash/splash.component';
import { WorkRouteComponent }    from './routes/work/work.route.component';
import { NewsRouteComponent }    from './routes/news/news.route.component';
import { ExhibitionsRouteComponent }    from './routes/exhibitions/exhibitions.route.component';
import { PressRouteComponent }    from './routes/press/press.route.component';
import { AboutComponent }    from './routes/about/about.component';
import { ContactComponent }    from './routes/contact/contact.component';


import { SubMenuDirective }    from './directives/subMenu.directive';


@Component({
  selector: 'my-app',
  provider: '[]',
  template: `
    
    <header *ngIf="menu">
        <a [routerLink]="['/']" target="_self">
            <div id="logo_shell">
            <img src='../images/logo.png' >
            </div>
        </a>

        <ul class="menu_comp" >
            <li><a [routerLink]="['/work']">work</a></li>
            <subMenu-directive [ngClass]="{subMenuShow: subMenu, subMenuHide: !subMenu}"></subMenu-directive>
            <div [ngClass]="{restMenuUp: subMenu, restMenuDown: !subMenu}">
            <li><a [routerLink]="['/news']">news</a></li>
            <li><a [routerLink]="['/exhibitions']">exhibitions</a></li>
            <li><a [routerLink]="['/press']">press</a></li>
            <li><a [routerLink]="['/about']">about</a></li>
            <li><a [routerLink]="['/contact']">contact</a></li>
            </div>
        </ul>
    
        <div class="mob_menu_wrap">
            <ul class="menu_phone" >
                <li><a [routerLink]="['/work']">work</a></li>
                <li><a [routerLink]="['/news']">news</a></li>
                <li><a [routerLink]="['/exhibitions']">exhibitions</a></li>
                <li><a [routerLink]="['/press']">press</a></li>
             </ul>
        </div>
    
    
      </header>  

    <router-outlet></router-outlet>
    
    <div class="mob_menu_wrap down">
        <ul class="menu_phone menu_down" >
            <li><a [routerLink]="['/about']">about</a></li>
            <li><a [routerLink]="['/contact']">contact</a></li>
        </ul>
    </div>
`,
        
  directives: [ROUTER_DIRECTIVES, SubMenuDirective]
})

    @Routes([
        
        {path: '/', component: SplashComponent},
        {path: '/work', component: WorkRouteComponent},
        {path: '/news', component: NewsRouteComponent}
        {path: '/exhibitions', component: ExhibitionsRouteComponent}
        {path: '/press', component: PressRouteComponent}
        {path: '/about', component: AboutComponent}
        {path: '/contact', component: ContactComponent}
        
        ])

export class AppComponent {
constructor(private router: Router, public location: Location) {
    this.router.changes.subscribe(() => this.menuMethod() ); 
}


menuMethod() {
    this.menu = true;
  
    if(this.location.path() === ''){
        this.menu = false;
    } 
      
        this.subMenu = false; 

        if (this.location.path().indexOf('/work')>-1){ 
            this.subMenu = true; 
            }
    
        if (this.init===true){ }  
     
  }


}