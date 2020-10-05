import { Directive, HostBinding, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[validateInput]',
})
export class ValidateInputDirective {
  constructor(@Self() private ngControl: NgControl) {}

  @HostBinding('class')
  get borderClass() {
    return this.showBorder ? 'in-valid' : null;
  }
  get showBorder() {
    return (
      (this.ngControl.dirty || this.ngControl.touched) && this.ngControl.invalid
    );
  }
}
