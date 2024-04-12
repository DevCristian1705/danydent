import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { ActivatedRoute, Router } from '@angular/router';
import { EInputValidation, InputComponent } from '../../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { ReactiveFormDirective } from '../../../../../shared/directives/reactiveForm.directive';
import { MedicosServices } from '../../../services/medicos.srv';
import { GlobalService } from '../../../../../core/service/global';
import { IMedico } from '../../../../../shared/interfaces/personas';
import { PreloaderComponent } from '../../../../../shared/components/preloader/preloader.component';
import { DialogConfirmComponent } from '../../../../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { messageDelete, messageType } from '../../../../../core/constants/message-type';

@Component({
  selector: 'app-add-medico',
  standalone: true,
  imports: [ 
    MatDialogModule,
    InputComponent,
    ButtonComponent,
    ReactiveFormDirective,
    ReactiveFormsModule, 
    CommonModule,
    PreloaderComponent
  ],
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.scss'
})
export class AddMedicoComponent {

  registerForm!: FormGroup; 
  loadingButton: boolean = false;
  numberInput = EInputValidation.Number; 
  listUser : any[] = [];
  idMedicoEdit : string = '';
  isLoading : boolean = false;
  
 get frmNameControl(): FormControl { return this.registerForm.get("names") as FormControl;}
 get frmLastNameControl(): FormControl { return this.registerForm.get("last_name") as FormControl;}
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
     private medicosrv: MedicosServices,    
     private globalsrv: GlobalService,    
     public dialog: MatDialog, 
     public router: Router, 
     private activatedRoute: ActivatedRoute,
   ) { 
    //Ovtener id del medico para editar
    let id = this.activatedRoute.snapshot.paramMap.get('idMedico'); 
    if (id != null) {
      this.idMedicoEdit = id
      this.onSetDatos();
      this.isLoading = true;
    }
    this.onForm();

   }
  
   
  onForm(){
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.registerForm = this.fb.group({
      id_medico: [ this.globalsrv.generateUniqueId('USER') , Validators.required], 
      names: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      cellphone: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(patronCorreo)]],
    //  photo: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onAdd() { 
    this.loadingButton = true;
    const DATA_FORM = this.registerForm.value;  
    this.medicosrv.add(DATA_FORM)  
 
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      disableClose: false, width: '350px', data: messageType.registro_medico
    }); 
    dialogRef.afterClosed().subscribe((resp: boolean) => { 
      if(resp){
        this.loadingButton = false;
        this.onForm()
      }else{
        setTimeout(() => this.onNavigate('dashboard/medicos'), 500);
      } 
    });  

   
  }

  onUpdate() { 
    this.loadingButton = true;
    const DATA_FORM = this.registerForm.value;  
    this.medicosrv.update(this.idMedicoEdit, DATA_FORM)
    setTimeout(() => this.onNavigate('dashboard/medicos'), 500);
  }
  
  onSetDatos() {
    this.medicosrv.getMedico(this.idMedicoEdit)
    .subscribe((resp: IMedico) => {
      this.registerForm.patchValue(resp); 
      this.isLoading = false;
    })
  }

  onNavigate(url :string){
    this.router.navigateByUrl(url)
  }


  onLoadPhoto(){
    
  }
  
 }
 