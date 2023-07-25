import { Injectable } from '@angular/core';

export enum ModalName {
  PatientInfo = 'patient-info'
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  activeModal?: ModalName;

  showModal(modal: ModalName): void {
    this.activeModal = modal;
  }

  hideModal(): void {
    this.activeModal = undefined;
  }
}
