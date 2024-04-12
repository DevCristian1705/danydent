import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MedicosServices } from '../../services/medicos.srv';
import { Router } from '@angular/router';
import { IMedico } from '../../../../shared/interfaces/personas';
import {MatTableModule} from '@angular/material/table';
import { DialogConfirmComponent } from '../../../../shared/dialog/dialog-confirm/dialog-confirm.component';
import { messageDelete } from '../../../../core/constants/message-type';
import { PreloaderComponent } from '../../../../shared/components/preloader/preloader.component';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [ 
    MatDialogModule, 
    ButtonComponent,  
    CommonModule,
    MatTableModule ,
    PreloaderComponent
  ],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss'
})


export class MedicosComponent {
  listMedicos : IMedico[] = [];
  displayedColumns: string[] = [ 'photo', 'names', 'last_name', 'cellphone', 'email', 'accion'];
  isLoading: boolean = false;
  constructor(
     public fb: FormBuilder, 
     private medicosrv: MedicosServices,   
     public dialog: MatDialog, 
     public router: Router,  
   ) { 
     
   }

   ngOnInit(){
    this.onLoadListMedicos();
   }
 
   onLoadListMedicos(){
    this.isLoading = true;
    this.medicosrv.getListMedicos().subscribe(resp => {
      this.listMedicos = resp; 
      this.isLoading = false;
    });
   }
     
   
    onAdd() { 
      this.router.navigateByUrl('dashboard/add-medico');
    }
   
    onDelete(id:string) {    
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        disableClose: false, width: '350px', data: messageDelete.delete_medico
      }); 
      dialogRef.afterClosed().subscribe((resp: boolean) => { 
        if(resp) this.medicosrv.delete(id)
      });  
    }
   
  
    onUpdate(id: string){
      this.router.navigateByUrl('dashboard/update/'+id);
    }

 }
 