import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static detectPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let value = control.value;
      if (!!value) {
        let strValue = String(value);
        if (strValue.length > 9) {
          return {
            maxlength: {
              requiredLength: 9,
            },
          };
        }
        if (!strValue.startsWith('5')) {
          return { phone_number: true };
        }
        return null;
      }
      return null;
    };
  }
  static detectPersonalNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let value: string = control.value;
      if (!!value) {
        let regexSymbols = /^[0-9]+$/gim;
        let testValue = regexSymbols.test(value);

        if (!testValue) {
          return {
            personal_number: true,
          };
        }
        if (value.length < 11) {
          return {
            minlength: {
              requiredLength: 11,
            },
          };
        }

        return null;
      }
      return null;
    };
  }

  static detectOnlyGeoOrEngLetters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let value = control.value;
      if (!!value) {
        let regexSymbols = /^(([a-zA-Z])+|([ა-ჰ])+)$/;
        let testValue = regexSymbols.test(value);
        return testValue ? null : { geo_en_letters: true };
      }
      return null;
    };
  }
}
