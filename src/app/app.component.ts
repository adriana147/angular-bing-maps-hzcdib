import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';

import { BingApiLoaderService } from './services/bing-api-loader.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  mapLoaded = false;

  constructor(private bingApiLoader: BingApiLoaderService) {
    this.bingApiLoader.load().then(() => {
      console.log('map loaded');
      this.mapLoaded = true;
    });
  }
}
