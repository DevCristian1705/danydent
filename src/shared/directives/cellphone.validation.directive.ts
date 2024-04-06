import { Directive, OnDestroy } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms'; 
import { Subscription } from 'rxjs';
 

@Directive({
  selector: '[cellphoneValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CellphoneValidationDirective,
      multi: true
    }
  ]
})

export class CellphoneValidationDirective implements Validator, OnDestroy {
  
  private subscription!: Subscription;
  constructor( 
  ) {}
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!this.subscription) {
      this.subscription = control.valueChanges
        .subscribe((resp: any) => {
          if (resp) {
              let firstDigit = resp.substr(-20, 1);
              if (+firstDigit != 9) {
                  control.setErrors({ customErrorCellphone: 'El celular debe empezar con el número 9' });
              } else if (+firstDigit === 9 && resp.length < 9) {
                control.setErrors({ customErrorCellphone: 'El celular debe tener 9 dígitos' });
              }
            } else {
              control.setErrors({ customErrorCellphone: 'Ingresa el número de celular' });
            }
        })
    }
    return null;
  }
}