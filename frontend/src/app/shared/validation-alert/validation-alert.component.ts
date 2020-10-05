import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-alert',
  templateUrl: './validation-alert.component.html',
  styleUrls: ['./validation-alert.component.scss'],
})
export class ValidationAlertComponent implements OnInit {
  @Input() errors: ValidationErrors;

  constructor() {}

  ngOnInit(): void {}
}
