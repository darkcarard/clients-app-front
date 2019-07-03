import {
  Component,
  OnInit
} from '@angular/core';
import {
  Client
} from 'src/app/shared/model/client';
import {
  ClientService
} from '../client.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import swal from 'sweetalert2';
import {
  DatePipe
} from '@angular/common';
import {
  ZoneService
} from '../../zones/zone.service';
import {
  Zone
} from 'src/app/shared/model/zone';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  client: Client = new Client();
  createdAt: Date;
  header: string = 'Client';
  zones: Zone[];

  constructor(private clientService: ClientService,
    private zoneService: ZoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe) {}

  ngOnInit() {
    this.loadClient();
    this.loadZones();
  }

  public create(): void {
    this.client.createdAt = this.datePipe.transform(this.createdAt, 'yyyy-MM-dd');
    this.clientService.createClient(this.client)
      .subscribe(
        client => {
          this.router.navigate(['/clients'])
          swal.fire('New Client', `${client.firstName} successfuly created`, 'success')
        }
      );
  }

  public update(): void {
    this.client.createdAt = this.datePipe.transform(this.createdAt, 'yyyy-MM-dd');
    console.log(this.client.createdAt);
    this.clientService.updateClient(this.client)
      .subscribe(
        client => {
          this.router.navigate(['/clients'])
          swal.fire('Update Client', `${client.firstName} successfuly updated`, 'success')
        }
      );
  }

  private loadClient(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.clientService.getClient(id).subscribe(
            client => {
              this.client = client;
              this.createdAt = new Date(this.client.createdAt);
            }
          )
        }
      }
    );
  }

  private loadZones(): void {
    this.zoneService.getZones().subscribe(
      zones => this.zones = zones
    );
  }

  zoneCompare(zone1: Zone, zone2: Zone): boolean {
    let result: boolean = false;
    if (zone1 === undefined && zone2 === undefined) {
      result = true;
    } else {
      result = zone1 === null || zone2 === null || zone1 === undefined || zone2 === undefined ? false : zone1.id === zone2.id;
    }
    return result;
  }
}
