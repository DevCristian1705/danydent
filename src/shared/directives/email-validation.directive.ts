import { Directive, OnDestroy } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms'; 
import { Subscription } from 'rxjs';
import { GlobalService } from '../../core/service/global';
 
@Directive({
  selector: '[emailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidationDirective,
      multi: true
    }
  ]
})

export class EmailValidationDirective implements Validator, OnDestroy {
  private subscription!: Subscription;
  constructor(
    private globalsrv: GlobalService
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
            let contentArroba = resp.includes('@'); 
            const [DATA_EMAIL, DATA_EMAIL_BEFORE_ARROBA] = resp.split('@');
            const validate = this.globalsrv.onValidateFormEmail(DATA_EMAIL_BEFORE_ARROBA);

            if(!contentArroba){
              control.setErrors({ customErrorEmail: 'Correo electrónico inválido' });
            }else{ 
              if (validate) {
                control.setErrors({ customErrorEmail: 'Correo electrónico inválido' });
              } else {
                control.setErrors(null);
              }
            } 
          }
        });
    }
    return null;
  }
}