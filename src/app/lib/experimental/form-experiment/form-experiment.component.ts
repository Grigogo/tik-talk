import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

@Component({
  selector: 'app-form-experiment',
  imports: [ReactiveFormsModule],
  templateUrl: './form-experiment.component.html',
  styleUrl: './form-experiment.component.scss',
})
export class FormExperimentComponent {
  ReceiverType = ReceiverType;

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    address: new FormGroup({
      city: new FormControl<string>(''),
      street: new FormControl<string>(''),
      building: new FormControl<string | null>(null),
      apartment: new FormControl<number | null>(null),
    }),
  });

  constructor() {
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

    this.form.controls.type.patchValue(ReceiverType.LEGAL, {});

    // console.log(this.form.valid);
    // console.log(this.form.value);

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
  }
}
