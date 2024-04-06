import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';  
import {  MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog'; 
import { ButtonComponent } from '../../components/button/button.component';
 
@Component({
  selector: 'app-dialog-encuesta', 
  standalone : true,
  imports: [ 
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './dialog-encuesta.component.html',
  styleUrl: './dialog-encuesta.component.scss'
})
export class DialogEncuestaComponent {
  width = 'auto';
   size = 'sm' ;
   bodyHtml : any ="";

  constructor(
    public dialogRef: MatDialogRef<DialogEncuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
   
    ) {
    if (data?.width) {
      this.width = data.width;
    }   
   }

   ngOnInit(){
    console.log('data', this.data)
   }
 
  onAceptar(value : boolean){
    this.dialogRef.close(value);
  }
}
