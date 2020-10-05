import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender, IUplaodAvatar, IUser } from 'src/app/core/models';
import { CustomValidators } from 'src/app/core/validaton';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user: IUser;
  @Output() onSubmit: EventEmitter<IUser> = new EventEmitter();
  avatar: IUplaodAvatar;
  userForm: FormGroup;
  genders = Gender;

  constructor(private fb: FormBuilder) {
    this.userForm = fb.group({
      first_name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          CustomValidators.detectOnlyGeoOrEngLetters(),
        ]),
      ],
      last_name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          CustomValidators.detectOnlyGeoOrEngLetters(),
        ]),
      ],
      gender: ['male', Validators.required],
      personal_number: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidators.detectPersonalNumber(),
        ]),
      ],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidators.detectPhone(),
        ]),
      ],
      legal_address: fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
      }),
      actual_address: fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.patchValue();
  }

  get addressForm() {
    return this.userForm.get('legal_address');
  }

  patchValue() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  copyLegalAddressToActual(e: MouseEvent) {
    e.preventDefault();
    this.userForm.get('actual_address').patchValue(this.addressForm.value);
  }

  selectAvatar = (avatar: IUplaodAvatar) => (this.avatar = avatar);

  submit(e: Event) {
    e.stopImmediatePropagation();
    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {
      this.onSubmit.emit({
        ...this.userForm.value,
        avatar: this.avatar,
      });
    }
  }
}
