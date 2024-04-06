import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MedicosServices } from '../../services/medicos.srv';
import { Router } from '@angular/router';
import { IMedico } from '../../../../shared/interfaces/personas';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [ 
    MatDialogModule, 
    ButtonComponent,  
    CommonModule,
    MatTableModule 
  ],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss'
})
export class MedicosComponent {

  listMedicos : IMedico[] = [];
  displayedColumns: string[] = [
    'photo', 'names', 'last_name', 'cellphone', 'email'];
 
  constructor(
     public fb: FormBuilder, 
     private medicosrv: MedicosServices,   
     public dialog: MatDialog, 
     public router: Router,  
   ) { 
 
    
    //LISTAR MEDICOS REGISTRADOS
    this.medicosrv.getListMedicos().subscribe(resp => {
      this.listMedicos = resp;
      console.log('listMedicos',this.listMedicos)
    });
   }

    onAdd() { 
      this.router.navigateByUrl('/add-medico');
    }
   
  
    onUpdate(id: string){
      this.router.navigateByUrl('/update/'+id);
    }

 }
 