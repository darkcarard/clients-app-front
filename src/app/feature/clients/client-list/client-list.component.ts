import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/model/client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  header: string = 'Clients';
  title: string = 'Clients List';

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );
  }

}
