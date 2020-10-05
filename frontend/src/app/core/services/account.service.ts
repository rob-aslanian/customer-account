import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AccountFormModalComponent } from 'src/app/lib/account/account-form-modal/account-form-modal.component';
import { IAccount } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  componentRef: NgbModalRef;
  constructor(private modal: NgbModal, private http: HttpClient) {}

  openAccountModal(account?: IAccount) {
    const compoenentRef = this.modal.open(AccountFormModalComponent);
    compoenentRef.componentInstance.account = account;
  }

  closeModal = () => this.modal.dismissAll();

  addAccount(account: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>('api/account', account);
  }

  updateAccount(id: string, account: IAccount): Observable<IAccount> {
    return this.http.put<IAccount>(`api/account/${id}`, account);
  }

  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`api/account/${id}`);
  }

  getAccountsByUserID(user_id: string): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`api/accounts/${user_id}`);
  }
}
