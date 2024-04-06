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

@Component({
  selector: 'app-add-medico',
  standalone: true,
  imports: [ 
    MatDialogModule,
    InputComponent,
    ButtonComponent,
    ReactiveFormDirective,
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.scss'
})
export class AddMedicoComponent {
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
     private medicosrv: MedicosServices,    
     private globalsrv: GlobalService,    
     public dialog: MatDialog, 
     public router: Router, 
     private activatedRoute: ActivatedRoute,
   ) { 
 
    //LISTAR MEDICOS REGISTRADOS
    this.medicosrv.getListMedicos().subscribe(resp => {
      console.log('RESP',resp)
    });
    //Ovtener id del medico para editar
    const ID_MEDICO = this.activatedRoute.snapshot.paramMap.get('idMEdico');
    console.log('ID_MEDICO', ID_MEDICO);

  

     const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
 
     this.registerForm = this.fb.group({
       id_medico: [ this.globalsrv.generateUniqueId('USER') , Validators.required], 
       names: ['', [Validators.required, Validators.minLength(3)]],
       lastname: ['', [Validators.required, Validators.minLength(3)]],
       cellphone: ['', [Validators.required, Validators.minLength(3)]],
       email: ['', [Validators.required, Validators.email, Validators.pattern(patronCorreo)]],
     //  photo: ['', [Validators.required, Validators.minLength(8)]],
     });
   }
  
   
   async onAdd() { 
     this.loadingButton = true;
     const DATA_FORM = this.registerForm.value;  
     const RESP =  await this.medicosrv.add(DATA_FORM) 
     console.log('RESP',RESP)
    }
   
  
    onEdit(id: string){
      this.router.navigateByUrl('/update/'+id);
    }
 }
 