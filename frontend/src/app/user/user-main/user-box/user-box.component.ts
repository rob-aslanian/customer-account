import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss'],
})
export class UserBoxComponent implements OnInit {
  @Input() user: IUser;
  @HostBinding('class') className = 'col-4';

  constructor() {}

  ngOnInit(): void {}
}
