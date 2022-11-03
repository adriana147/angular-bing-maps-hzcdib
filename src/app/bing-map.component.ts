import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { SiteConditionsService } from './services/site-conditions.service';

@Component({
  selector: 'bing-map',
  templateUrl: 'bing-map.component.html',
  styles: [``]
})
export class BingMapComponent implements OnChanges, AfterViewInit  {

  @ViewChild('streetsideMap') streetsideMapViewChild: ElementRef;

  get center() {
    return this.service.center$;
  }

  streetsideMap: Microsoft.Maps.Map;

  position: Microsoft.Maps.Location;

  log: string[] = [];
  
  constructor(private service: SiteConditionsService) {
    this.log.push('Constructor');
  }

  ngOnChanges() {
    this.log.push('OnChanges');
  }

  ngAfterViewInit() {
    this.log.push('AfterViewInit');
    this.createStreetSideMap();
    this.service.center$.pipe(
      filter(coords => !!coords),
      take(1)
    ).subscribe(coords => {
      const [lat, lon] = coords;
      this.log.push(`Got coords from service: ${coords}`);
      const position = new Microsoft.Maps.Location(lat, lon);
      this.streetsideMap.setView({ center: position });
      this.log.push(`current Center: ${this.streetsideMap.getCenter()}`);
    });
  }

  createStreetSideMap() {
    this.streetsideMap = new Microsoft.Maps.Map(
      this.streetsideMapViewChild.nativeElement,
      {
        mapTypeId: Microsoft.Maps.MapTypeId.streetside,
        credentials: 'bingKEY',
        streetsideOptions: {
          overviewMapMode: Microsoft.Maps.OverviewMapMode.hidden,
          showExitButton: false,
        }
      }
    );
  }

  hasLogEntries() {
    return this.log.length > 0;
  }
}
