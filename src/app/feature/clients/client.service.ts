import { Injectable } from '@angular/core';
import { CLIENTS } from './client-list/clients.json';
import { Client } from 'src/app/shared/model/client.js';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  host = 'http://localhost:8080/api/';
  findAllClientsUri = 'clients/';

  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.host + this.findAllClientsUri);
  }
}
