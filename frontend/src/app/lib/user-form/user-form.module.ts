import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAddressComponent } from './user-address/user-address.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { SafePipe } from 'src/app/core/pipes/safe.pipe';
import { DragDropDirective } from 'src/app/core/directives/drag-drop.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserFormComponent,
    UserAddressComponent,
    UploadAvatarComponent,
    DragDropDirective,
    SafePipe,
  ],
  imports: [ReactiveFormsModule, SharedModule, FormsModule, CommonModule],
  exports: [UserFormComponent],
})
export class UserFormModule {}
