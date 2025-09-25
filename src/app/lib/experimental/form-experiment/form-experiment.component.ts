import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MockService, IFeature } from './mock.service';
import { KeyValuePipe } from '@angular/common';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

interface IAddress {
  city?: string;
  street?: string;
  building?: string;
  apartment?: number;
}

function getAddressForm(initialValue: IAddress = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<string | null>(initialValue.building ?? ''),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

function validateStartWith(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
      ? {
          startsWith: {
            message: `${forbiddenLetter} - последняя буква алфавита!`,
          },
        }
      : null;
  };
}

function validateDateRange({
  fromControlName,
  toControlName,
}: {
  fromControlName: string;
  toControlName: string;
}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if (!fromControl || !toControl) return null;

    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);

    if (fromDate && toDate && fromDate > toDate) {
      toControl.setErrors({
        dateRange: {
          message: 'Дата начала не может быть позднее даты конца',
        },
      });
      return {
        dateRange: {
          message: 'Дата начала не может быть позднее даты конца',
        },
      };
    }

    return null;
  };
}

// const validateStartWith: ValidatorFn = (control: AbstractControl) => {
//   return control.value.startsWith('я')
//     ? { startsWith: 'Я - последняя буква алфавита!' }
//     : null;
// };

@Component({
  selector: 'app-form-experiment',
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './form-experiment.component.html',
  styleUrl: './form-experiment.component.scss',
})
export class FormExperimentComponent {
  ReceiverType = ReceiverType;

  // #fb = inject(FormBuilder);
  //
  // form = this.#fb.group({
  //   type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
  //   name: this.#fb.control<string>(''),
  //   lastName: this.#fb.control<string>(''),
  //   inn: this.#fb.control<string>(''),
  //   address: this.#fb.group({
  //     city: this.#fb.control<string>(''),
  //     street: this.#fb.control<string>(''),
  //     building: this.#fb.control<string | null>(null),
  //     apartment: this.#fb.control<number | null>(null),
  //   }),
  // });

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', [
      Validators.required,
      validateStartWith('m'),
    ]),
    lastName: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
    dateRange: new FormGroup(
      {
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      },
      validateDateRange({ fromControlName: 'from', toControlName: 'to' }),
    ),
  });

  mockService = inject(MockService);
  features: IFeature[] = [];

  constructor() {
    this.mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addrs) => {
        // while(this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0);
        // }

        this.form.controls.addresses.clear();

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr));
        }

        // this.form.controls.addresses.setControl(1, getAddressForm(addrs[0]));

        // console.log(this.form.controls.addresses.at(0));

        // this.form.controls.addresses.disable();
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value),
          );
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        console.log('type event');

        this.form.controls.inn.clearValidators();

        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        }
      });

    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => console.log(val));
  }

  onSubmit(event: SubmitEvent) {
    // const formPatch = {
    //   name: 'Alesha',
    //   lastName: 'Popovich',
    // };
    //
    // this.form.patchValue(formPatch, {
    //   emitEvent: true,
    // });

    this.form.controls.type.patchValue(ReceiverType.LEGAL, {
      // onlySelf: true,
    });

    // console.log(this.form.valid);
    // console.log(this.form.value);

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log(this.form.value);
    console.log(this.form.getRawValue());
  }

  addAddress() {
    this.form.controls.addresses.push(getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;
}
