import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountFormModalComponent } from './account-form-modal/account-form-modal.component';
import {
  NgbDropdown,
  NgbDropdownModule,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountTableComponent } from './account-table/account-table.component';

@NgModule({
  declarations: [AccountFormModalComponent, AccountTableComponent],
  imports: [
    NgbModalModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [AccountTableComponent],
})
export class AccountModule {}
