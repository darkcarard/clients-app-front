import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  show: boolean = false;

  constructor() { }

  openModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }
}
