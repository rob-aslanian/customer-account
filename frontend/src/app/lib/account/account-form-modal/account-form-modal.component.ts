import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { finalize } from 'rxjs/operators';
import { AccountType, Currency, IAccount } from 'src/app/core/models';
import { AccountService } from 'src/app/core/services/account.service';
import {
  AddAccount,
  UpdateAccount,
} from 'src/app/core/store/user/user.actions';

@Component({
  selector: 'app-account-form-modal',
  templateUrl: './account-form-modal.component.html',
  styleUrls: ['./account-form-modal.component.scss'],
})
export class AccountFormModalComponent implements OnInit {
  accountTypes: typeof AccountType = AccountType;
  currencies = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
  };
  accountForm: FormGroup;
  account: IAccount;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.accountForm = this.fb.group({
      account_type: ['', Validators.required],
      currency: [[], Validators.required],
      is_active: [true],
    });
  }

  ngOnInit(): void {
    this.setCurrencies();
    this.patchForm();
  }

  setCurrencies() {
    Object.keys(Currency).map((el) =>
      this.currencies.push({
        id: el,
        value: el,
      })
    );
  }

  patchForm() {
    if (this.account) {
      const currency = this.account.currency.map((el) => ({
        id: el,
        value: el,
      }));

      this.accountForm.patchValue({
        ...this.account,
        currency,
      });
    }
  }

  save(e: Event) {
    e.preventDefault();

    this.accountForm.markAllAsTouched();
    if (this.accountForm.valid) {
      const currency = this.accountForm
        .get('currency')
        .value.map((el) => el.id);

      return this.account
        ? this.updateAccount(currency)
        : this.addAccount(currency);
    }
  }
  updateAccount(currency: string[]) {
    this.accountService
      .updateAccount(this.account._id, {
        ...this.accountForm.value,
        currency,
      })
      .pipe(finalize(() => this.close()))
      .subscribe((el) => this.store.dispatch(new UpdateAccount(el)));
  }
  addAccount(currency: string[]) {
    this.accountService
      .addAccount({
        ...this.accountForm.value,
        currency,
      })
      .pipe(finalize(() => this.close()))
      .subscribe((el) => this.store.dispatch(new AddAccount(el)));
  }
  close = () => this.accountService.closeModal();
}
