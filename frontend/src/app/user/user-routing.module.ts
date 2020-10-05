import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserMainComponent,
      },
      {
        path: 'user/:id',
        component: UserDetailComponent,
      },
      {
        path: 'setting',
        component: UserSettingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
