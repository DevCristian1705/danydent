import { Directive, OnDestroy } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms'; 
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { GlobalService } from '../../core/service/global';
 
@Directive({
  selector: '[passValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidationDirective,
      multi: true
    }
  ]
})

export class PasswordValidationDirective implements Validator, OnDestroy {
  private subscription!: Subscription;
  constructor( 
    private service: GlobalService
  ) {}
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!this.subscription) {
      this.subscription = control.valueChanges
        .pipe(
          tap((resp: any) => {
            if (resp) {  
                let cumplePass = this.service.onValidPass(resp); 
                if (!cumplePass) {
                control.setErrors({ customErrorPass: 'Completa la contraseña.' });
              } else {
                control.setErrors(null);
              }
            }
          })
        )
        .subscribe();
    }
    return null;
  }
}