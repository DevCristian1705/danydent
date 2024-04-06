import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';   
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EInputValidation, InputComponent } from '../../../../shared/components/input/input.component';
import { StorageService } from '../../../../core/service/storage/storage.service';
import { GlobalService } from '../../../../core/service/global';
import { ReactiveFormDirective } from '../../../../shared/directives/reactiveForm.directive';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth.service';
 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    MatDialogModule,
    InputComponent,
    ButtonComponent,
    ReactiveFormDirective,
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup; 
  loadingButton: boolean = false;
  numberInput = EInputValidation.Number; 
  listUser : any[] = [];
 
 get frmNameControl(): FormControl { return this.registerForm.get("names") as FormControl;}
 get frmLastNameControl(): FormControl { return this.registerForm.get("lastname") as FormControl;}
 get frmCellphoneControl(): FormControl { return this.registerForm.get("cellphone") as FormControl;}
 get frmEmailControl(): FormControl { return this.registerForm.get("email") as FormControl;}
 get frmPassControl(): FormControl { return this.registerForm.get("password") as FormControl;}
   
 get getErrorName(): string {
   if (this.frmNameControl.invalid && this.frmNameControl.touched) {
     if (this.frmNameControl.hasError('required')) { return 'Ingresa un/tus nombre(s)'} 
   }
   return '';
 }
 
 get getErrorLastName(): string {
   if (this.frmLastNameControl.invalid && this.frmLastNameControl.touched) {
     if (this.frmLastNameControl.hasError('required')) { return 'Ingresa el/los/ apellidos'} 
   }
   return '';
 }
 
 get getErrorCellphone(): string {
   if (this.frmCellphoneControl.invalid && this.frmCellphoneControl.touched) {
     if (this.frmCellphoneControl.hasError('required')) { return 'Ingresa un celular'} 
     if (this.frmCellphoneControl.hasError('customErrorCellphone')) {
       return this.frmCellphoneControl?.errors?.['customErrorCellphone'];
     }
   }
   return '';
 }
 
 get getErrorEmail(): string { 
   if (this.frmEmailControl.invalid && this.frmEmailControl.touched) {
     if (this.frmEmailControl.hasError('required')) { return 'Ingresa un correo electrónico.'}
     if (this.frmEmailControl.hasError('pattern')) { return 'Ingresa un correo electrónico correcto.'} 
   }
   return '';
 }
 
 get getErrorPass(): string {
   if (this.frmPassControl.invalid && this.frmPassControl.touched) {
     if (this.frmPassControl.hasError('required')) { return 'Ingresa una contraseña'} 
     if (this.frmPassControl.hasError('customErrorPass')) {
       return this.frmPassControl?.errors?.['customErrorPass'];
     }
   }
   return '';
 }
   
   constructor(
     public fb: FormBuilder, 
     private router: Router,  
     private storageService : StorageService,
     private globalsrv: GlobalService, 
     public dialog: MatDialog,
     public authsrv: AuthService,
   ) { 
     const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
 
     this.registerForm = this.fb.group({
       code_user: [ this.globalsrv.generateUniqueId('USER') , Validators.required], 
       names: ['', [Validators.required, Validators.minLength(3)]],
       lastname: ['', [Validators.required, Validators.minLength(3)]],
       cellphone: ['', [Validators.required, Validators.minLength(3)]],
       email: ['', [Validators.required, Validators.email, Validators.pattern(patronCorreo)]],
       password: ['', [Validators.required, Validators.minLength(8)]],
     });
   }
 
  
   onLogin() {
     this.router.navigateByUrl("auth/login");
   }
   
   onRegistro() { 
     this.loadingButton = true;
     const DATA_FORM = this.registerForm.value;  
     let datos = this.authsrv.register(DATA_FORM.email, DATA_FORM.password); 
     console.log('datos register',datos);
   }
  
  //  onValidateDatos(newUser: IUser){  
  //    this.listUser.push(this.storageService.listUsuarios()); 
  //    const listUserRegistrados = this.listUser
 
  
  //    let existingUser = listUserRegistrados.filter((user: IUser) => 
  //        user.names === newUser.names && user.email === newUser.email
  //    );
  
  //    if (existingUser.length === 0) {
  //      listUserRegistrados.push(newUser);
  //      this.storageService.setData(STORAGE_KEY.listUser, JSON.stringify(listUserRegistrados));
  //      this.loadingButton = false; 
  //      this.onLogin(); 
  //    } else { 
  //      this.loadingButton = false;  
 
  //      const dialogRef = this.dialog.open(DialogMessageComponent, {
  //        disableClose: false, width: '350px', data: messageAuth.datos_existentes 
  //      }); 
  //      dialogRef.afterClosed().subscribe((resp: boolean) => { 
  //        this.onLogin(); 
  //      });   
 
  //      return;
  //    }
   
   
  //  }
  
  
 }
 