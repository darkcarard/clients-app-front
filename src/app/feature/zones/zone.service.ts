import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from 'src/app/shared/model/zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private host: string = 'http://localhost:8080/api/';
  private findAllZonesUri = 'zones/';

  constructor(private httpClient: HttpClient) { }

  getZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.host + this.findAllZonesUri);
  }
}
