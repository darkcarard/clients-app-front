import { Injectable } from '@angular/core';
import { Client } from 'src/app/shared/model/client.js';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import swal, { SweetAlertType } from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})
  private host: string = 'http://localhost:8080/api/';
  private findAllClientsUri: string = 'clients/';
  private findAllClientsPaginatedUri: string = 'clients/page/';
  private createClientUri: string = 'clients/';
  private findClientUri: string = 'clients/';
  private updateClientUri: string = 'clients/';
  private deleteClientUri: string = 'clients/';
  private clientsRedirectUri: string = '/clients';
  private getClientErrorTitle: string = 'Error getting the client';
  private duplicatedEmailErrorTitle: string = 'Duplicated email';
  private sweetAlertErrorType: SweetAlertType = 'error';


  constructor(private httpClient: HttpClient, private router: Router) { }

  getClients(page: number): Observable<any> {
    return this.httpClient.get<Client[]>(this.host + this.findAllClientsPaginatedUri + page);
  }

  createClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.host + this.createClientUri, client, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire(this.duplicatedEmailErrorTitle, e.error.message, this.sweetAlertErrorType);
        return throwError(e);
      })
    );
  }

  getClient(id: number): Observable<Client> {
    return this.httpClient.get<Client>(this.host + this.findClientUri + id).pipe(
      catchError(e => {
        this.router.navigate([this.clientsRedirectUri]);
        swal.fire(this.getClientErrorTitle, e.error.message, this.sweetAlertErrorType);
        return throwError(e);
      })
    );
  }

  updateClient(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(this.host + this.updateClientUri + client.id, client, {headers: this.httpHeaders});
  }

  deleteClient(id: number): Observable<Client> {
    return this.httpClient.delete<Client>(this.host + this.deleteClientUri + id);
  }
}
