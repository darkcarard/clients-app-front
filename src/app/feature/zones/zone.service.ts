import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Zone } from 'src/app/shared/model/zone';
import { Router } from '@angular/router';
import { AuthService } from '../users/auth.service';

@Injectable({ providedIn: 'root' })
export class ZoneService {

  private host: string = 'http://localhost:8080/api/';
  private findAllZonesUri = 'zones/';

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) { }

  getZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.host + this.findAllZonesUri);
  }
}
