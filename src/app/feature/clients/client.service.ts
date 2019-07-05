import { Injectable } from '@angular/core';
import { Client } from 'src/app/shared/model/client.js';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ClientService {

  private host: string = 'http://localhost:8080/api/';
  private findAllClientsPaginatedUri: string = 'clients/page/';
  private createClientUri: string = 'clients/';
  private findClientUri: string = 'clients/';
  private updateClientUri: string = 'clients/';
  private deleteClientUri: string = 'clients/';
  private clientsRedirectUri: string = '/clients';
  private clientsUploadUri: string = 'clients/upload/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getClients(page: number): Observable <any> {
    return this.httpClient.get<Client[]>(this.host + this.findAllClientsPaginatedUri + page);
  }

  createClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.host + this.createClientUri, client).pipe(
        catchError(e => {          
          console.error(e);
          return throwError(e);
        })
      );
  }

  getClient(id: number): Observable<Client> {
    return this.httpClient.get<Client>(this.host + this.findClientUri + id)
    .pipe(
      catchError(e => {
        if(e.status != 401) {
          this.router.navigate([this.clientsRedirectUri]);
        }
        console.error(e);
        return throwError(e);
      })
    );
  }

  updateClient(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(this.host + this.updateClientUri + client.id, client);
  }

  deleteClient(id: number): Observable <Client> {
    return this.httpClient.delete<Client>(this.host + this.deleteClientUri + id);
  }

  uploadImage(file: File, id: number): Observable <HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id.toString());

    const request = new HttpRequest('POST', this.host + this.clientsUploadUri, formData, {
      reportProgress: true
    });

    return this.httpClient.request(request);
  }
}
