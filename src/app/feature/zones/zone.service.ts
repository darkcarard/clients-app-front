import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Zone } from 'src/app/shared/model/zone';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ZoneService {

  private host: string = 'http://localhost:8080/api/';
  private findAllZonesUri = 'zones/';

  constructor(private httpClient: HttpClient, private router: Router) { }

  private isUnauthorized(e): Boolean {
    if (e.status == 401 || e.status == 403) {      
      this.router.navigate(['/login']);
      return true;
    }     
    return false;
  }

  getZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.host + this.findAllZonesUri).pipe(
      catchError(e => {
        this.isUnauthorized(e);
        return throwError(e);
      })
    );
  }
}
