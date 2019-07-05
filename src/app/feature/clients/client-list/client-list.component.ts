import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/shared/model/client';
import { ClientService } from '../client.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { AuthService } from '../../users/auth.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  header: string = 'Clients';
  title: string = 'Clients List';
  notClientsMessage = 'There are not registered clients!';

  clients: Client[];
  paginator: any;
  selectedClient: Client;

  constructor(private clientService: ClientService, 
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private authService: AuthService) { }

  ngOnInit() {    
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = params.get('page') ? +params.get('page') : 0;      
      this.clientService.getClients(page).subscribe(
        response => {
          this.clients = response.content as Client[];
          this.paginator = response;
        }
      )
    });

    this.modalService.uploadNotify.subscribe(client => {
      this.clients = this.clients.map(originalClient => {
        if (client.id == originalClient.id) {
          originalClient.picture = client.picture;
        }
        return originalClient;
      })
    });
  }

  deleteClient(client: Client): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(client.id).subscribe(
          response => { 
            this.clients = this.clients.filter(cli => cli !== client);
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `${client.firstName} has been deleted.`,
              'success'
            );
          }
        );        
      } 
    })
  }

  openModal(client: Client) {
    this.selectedClient = client;
    this.modalService.openModal();
  }
}
