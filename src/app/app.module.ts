import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BingMapComponent } from './bing-map.component';

import { SiteConditionsService } from './services/site-conditions.service';
import { BingApiLoaderService } from './services/bing-api-loader.service';
import { WINDOW_PROVIDERS } from './services/window.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BingMapComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ SiteConditionsService, WINDOW_PROVIDERS, BingApiLoaderService ]
})
export class AppModule { }
