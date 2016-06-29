import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS }    from '@angular/http';
import { ROUTER_PROVIDERS }    from '@angular/router';


import { AppComponent } from './app.component';

import {enableProdMode} from '@angular/core';
enableProdMode();
bootstrap(<any>AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS])