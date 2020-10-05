import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserBoxComponent } from './user-main/user-box/user-box.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { UserMainComponent } from './user-main/user-main.component';
import { UserDetailAddressComponent } from './user-detail/user-detail-address/user-detail-address.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { UserFormModule } from '../lib/user-form/user-form.module';
import { AccountModule } from '../lib/account/account.module';

@NgModule({
  declarations: [
    UserComponent,
    UserBoxComponent,
    UserDetailComponent,
    UserMainComponent,
    UserDetailAddressComponent,
    UserSettingComponent,
  ],
  imports: [
    NgbPaginationModule,
    UserFormModule,
    AccountModule,
    SharedModule,
    CommonModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
