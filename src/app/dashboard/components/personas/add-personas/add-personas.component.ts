import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReactiveFormDirective } from '../../../../../shared/directives/reactiveForm.directive';
import { EInputValidation, InputComponent } from '../../../../../shared/components/input/input.component';
import { GlobalService } from '../../../../../core/service/global';
import { PersonasServices } from '../../../services/pacientes.srv';
import { DropdownListComponent } from '../../../../../shared/components/dropsdown/dropdown-list.component';
import { IMedioPago, ITiempoAlquiler } from '../../../../../shared/interfaces/listas';

@Component({
  selector: 'app-add-personas',
  standalone: true,
  imports: [ 
    CommonModule,
    ButtonComponent,
    ReactiveFormDirective,
    ReactiveFormsModule, 
    InputComponent,
    DropdownListComponent
  ],
  templateUrl: './add-personas.component.html',
  styleUrl: './add-personas.component.scss'
})
export class AddPersonasComponent {

  width = 'auto';
  size = 'sm' ;
  registerForm!: FormGroup; 
  numberInput = EInputValidation.Number; 
  listTiempoAlquiler : ITiempoAlquiler[] = [];
  lisMedioPago : IMedioPago[] = [];

  get frmNameControl(): FormControl { return this.registerForm.get("names") as FormControl;}
  get frmTiempoControl(): FormControl { return this.registerForm.get("tiempo") as FormControl;}
  get frmTiempoCodeControl(): FormControl { return this.registerForm.get("tiempo_code") as FormControl;}
  get frmTipoPagoControl(): FormControl { return this.registerForm.get("tipo_pago") as FormControl;}
  get frmDocumentNumberControl(): FormControl { return this.registerForm.get("document_number") as FormControl;} 
     
  get getErrorName(): string {
    if (this.frmNameControl.invalid && this.frmNameControl.touched) {
      if (this.frmNameControl.hasError('required')) { return 'Ingresa un/tus nombre(s)'} 
    }
    return '';
  }
  
  get getErrorTiempo(): string {
    if (this.frmTiempoControl.invalid && this.frmTiempoControl.touched) {
      if (this.frmTiempoControl.hasError('required')) { return 'Selecciona un tiempo'} 
    }
    return '';
  }
 
  get getErrorTipodePago(): string {
    if (this.frmTipoPagoControl.invalid && this.frmTipoPagoControl.touched) {
      if (this.frmTipoPagoControl.hasError('required')) { return 'Ingresa el tipo de pago'} 
    }
    return '';
  }


  constructor(
    public fb: FormBuilder,    
    public globalserv: GlobalService,    
    public personasrv: PersonasServices,    
    public dialogRef: MatDialogRef<AddPersonasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
   
    ) {
 
    this.onForm();
    this.onLoadListTiempo();
    this.onLoadMedioPago();

    if (data?.width) this.width = data.width   

    if (this.data != null) {
      this.onSetDatos(); 
    }
    console.log(this.registerForm);

   }

   onForm(){ 
    this.registerForm = this.fb.group({  
      names: ['', [Validators.required, Validators.minLength(3)]],
      tiempo: [Validators.required], 
      tiempo_code: [Validators.required], 
      tiempo_restante: ['0'], 
      tipo_pago: [Validators.required], 
      fecha: [new Date(), Validators.required], 
      document_number: ['', [Validators.minLength(3)]],
      isActive: [true],
      isReload: [false],
      isStatus: ['card'],
    });
  }

  onLoadListTiempo(){
    this.globalserv.getTiempoAlquiler()
    .subscribe((resp : ITiempoAlquiler[]) => {
      this.listTiempoAlquiler = resp; 
      if (!this.data) this.getDataValue( this.listTiempoAlquiler[0], '') 
    })
  }

  onLoadMedioPago(){
    this.globalserv.getMediosPago()
    .subscribe((resp : IMedioPago[]) => {
      this.lisMedioPago = resp; 
      if (!this.data) this.getDataValue( this.lisMedioPago[0], 'Medio_de_Pago')  
    })

  }

  onAdd(){
    const DATA_FORM = this.registerForm.value;   
    this.personasrv.add(DATA_FORM)  
    this.dialogRef.close();
  }

  onUpdate(){
    const DATA_FORM = this.registerForm.value;  
    this.personasrv.update(this.data.id_persona, DATA_FORM);
    this.dialogRef.close();
  }

  onSetDatos() {  
    const TIPO_PAGO = this.lisMedioPago.find( (x) => x.name ===  this.data.tipo_pago )
    const TIEMPO = this.listTiempoAlquiler.find( (x) => x.name ===  this.data.tiempo )
    this.registerForm.patchValue({
      tipo_pago: TIPO_PAGO?.name,
      tiempo: TIEMPO?.name,
      tiempo_code : this.data.tiempo_code,
      names : this.data.names,
      id_persona : this.data.id_persona
    }) 
  }

  getDataValue(event: any, control : string) {  
    if(control === 'Medio_de_Pago'){
      this.frmTipoPagoControl.setValue(event.name) 
    }else{
      this.frmTiempoControl.setValue(event.name)
      this.frmTiempoCodeControl.setValue(event.code)
    }
  }


  onClosed(){
    this.dialogRef.close();
  }

}
