import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from 'src/app/shared/model/client';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  @Input() client: Client;

  header: string = 'Client Detail';
  progress: number = 0;
  private selectedFile: File;
  private notFileSelectedErrorTitle: string = 'Upload error';
  private notFileSelectedError: string = 'You must select a file for upload!';
  private wrongFormatErrorTitle: string = 'File format error';
  private wrongFormatError: string = 'You must upload an image file!';
 
  constructor(private clientService: ClientService,     
    private modalService: ModalService) { }

  ngOnInit() {}

  chooseFile(event: any) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile.type.indexOf('image') < 0) {
      swal.fire(this.wrongFormatErrorTitle, this.wrongFormatError, 'error');
      this.selectedFile = null;
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.clientService.uploadImage(this.selectedFile, this.client.id).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded/event.total)*100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.client = response as Client;
            swal.fire('File upload', 'File uploaded succesfully!', 'success');
          }          
        }
      );
    } else {
      swal.fire(this.notFileSelectedErrorTitle, this.notFileSelectedError, 'error');
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.selectedFile = null;
    this.progress = 0;
  }
}