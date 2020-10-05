import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar',
})
export class AvatarPipe implements PipeTransform {
  transform(value: any): string {
    return !value ? '../assets/img/avatar-svgrepo-com.svg' : `files/${value}`;
  }
}
