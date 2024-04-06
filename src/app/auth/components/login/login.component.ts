import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../../shared/interfaces/user.interface';
import { StorageService } from '../../../../core/service/storage/storage.service'; 
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ReactiveFormDirective } from '../../../../shared/directives/reactiveForm.directive';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    MatDialogModule, 
    InputComponent,
    ButtonComponent, 
    ReactiveFormDirective, 
    ReactiveFormsModule,
    CommonModule, 
  ],
  providers : [
    AuthService,
    AngularFireAuth,
   
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup; 
  loadingButton: boolean = false; 
  userReg : IUser = {} as IUser;
  listUser : any[] = [];
  emailExiste : boolean = false; 
 

  constructor(
    public fb: FormBuilder, 
    private router: Router,   
    public dialog: MatDialog,
    public authsrv: AuthService
  ) {
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(patronCorreo)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  get frmEmailControl(): FormControl { return this.loginForm.get("email") as FormControl;  }
  get frmPassControl(): FormControl { return this.loginForm.get("password") as FormControl;  }

  get getErrorEmail(): string { 
    if (this.frmEmailControl.invalid && this.frmEmailControl.touched) {
      if (this.frmEmailControl.hasError('required')) { return 'Ingresa un correo electrónico.'}
      if (this.frmEmailControl.hasError('pattern')) { return 'Ingresa un correo electrónico correcto.'}
      if (this.frmEmailControl.hasError('customErrorEmail')) { return this.frmEmailControl?.errors?.['customErrorEmail']}
    }
    return '';
  }

  get getErrorPass(): string {
    if (this.frmPassControl.invalid && this.frmPassControl.touched) {
      if (this.frmPassControl.hasError('required')) { return 'Ingresa una contraseña'}
      if (this.frmPassControl.hasError('customErrorPass')) { return this.frmPassControl?.errors?.['customErrorPass']}
    }
    return '';
  }
  
  onLoginGoogle(){ 
    this.authsrv.loginGoogle();
  }

  onLogin() { 
    this.loadingButton = true
    const DATA_FORM = this.loginForm.value;   
    this.authsrv.login(DATA_FORM.email, DATA_FORM.password)  
  }
 
  onNavigate(url : string){
    this.router.navigateByUrl(url);
  }

}

