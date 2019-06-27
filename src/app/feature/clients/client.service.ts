import { Injectable } from '@angular/core';
import { CLIENTS } from './client-list/clients.json';
import { Client } from 'src/app/shared/model/client.js';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})
  private host: string = 'http://localhost:8080/api/';
  private findAllClientsUri: string = 'clients/';
  private createClientUri: string = 'clients/';
  private findClientUri: string = 'clients/';
  private updateClientUri: string = 'clients/';
  private deleteClientUri: string = 'clients/';


  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.host + this.findAllClientsUri);
  }

  createClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.host + this.createClientUri, client, {headers: this.httpHeaders});
  }

  getClient(id: number): Observable<Client> {
    return this.httpClient.get<Client>(this.host + this.findClientUri + id);
  }

  updateClient(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(this.host + this.updateClientUri + client.id, client, {headers: this.httpHeaders});
  }

  deleteClient(id: number): Observable<Client> {
    return this.httpClient.delete<Client>(this.host + this.deleteClientUri + id);
  }
}
