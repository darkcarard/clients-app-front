import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/model/client';
import { ClientService } from '../client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  client: Client = new Client();
  header: string = 'Client';

  constructor(private clientService: ClientService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }

  public create(): void {
    this.clientService.createClient(this.client)
      .subscribe(
        client => {          
          this.router.navigate(['/clients'])
          swal.fire('New Client', `${client.firstName} successfuly created`, 'success')
        }
      )
  }

  public update(): void {
    this.clientService.updateClient(this.client)
    .subscribe(
      client => {
        this.router.navigate(['/clients'])
        swal.fire('Update Client', `${client.firstName} successfuly updated`, 'success')
      }
    )
  }

  private loadClient(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.clientService.getClient(id).subscribe(
            client => this.client = client
          )
        } 
      }
    )
  }

}
