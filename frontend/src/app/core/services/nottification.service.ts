import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NottificationService {
  constructor() {}

  showNotify(notify: SweetAlertOptions) {
    return Swal.fire(notify);
  }
}
