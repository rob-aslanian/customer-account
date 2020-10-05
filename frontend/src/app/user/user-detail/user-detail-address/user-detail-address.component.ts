import { Component, Input, OnInit } from '@angular/core';
import { IAddress } from 'src/app/core/models';

@Component({
  selector: 'app-user-detail-address',
  templateUrl: './user-detail-address.component.html',
  styleUrls: ['./user-detail-address.component.scss'],
})
export class UserDetailAddressComponent implements OnInit {
  @Input() data: IAddress;

  constructor() {}

  ngOnInit(): void {}
}
