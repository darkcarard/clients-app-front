import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  show: boolean = false;
  private _uploadNotify: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  get uploadNotify(): EventEmitter<any> {
    return this._uploadNotify;
  }

  openModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }
}
