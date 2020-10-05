import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationAlertComponent } from './validation-alert/validation-alert.component';
import { ValidateInputDirective } from '../core/directives/validate-input.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { AvatarPipe } from '../core/pipes/avatar.pipe';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { DelimetrPipe } from '../core/pipes/delimetr.pipe';

const shared = [
  SpinnerComponent,
  ValidationAlertComponent,
  UserPopupComponent,
  ValidateInputDirective,
  AvatarPipe,
  DelimetrPipe,
];

@NgModule({
  declarations: [...shared],
  imports: [NgbDropdownModule, RouterModule, CommonModule],
  exports: [...shared],
})
export class SharedModule {}
