import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';  
import {  MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog'; 
import { ButtonComponent } from '../../components/button/button.component';
 
@Component({
  selector: 'app-dialog-confirm', 
  standalone : true,
  imports: [ 
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
  width = 'auto';
  size = 'sm' ;
    
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
   
    ) {
    if (data?.width) {
      this.width = data.width;
    }   
   }
 
  onAceptar(value : boolean){
    this.dialogRef.close(value);
  }
}