import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emptyStringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) {
      return null;
    }

    const trimString = value.trim();

    return !trimString ? { emptyString: true } : null;
  };
}