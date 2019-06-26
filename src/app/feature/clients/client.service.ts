import { Injectable } from '@angular/core';
import { CLIENTS } from './client-list/clients.json';
import { Client } from 'src/app/shared/model/client.js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients(): Observable<Client[]> {
    return of(CLIENTS);
  } 
}
