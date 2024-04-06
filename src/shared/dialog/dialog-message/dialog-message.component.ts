import { Component, Inject } from '@angular/core';  
import {  MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog'; 
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'cbx-dialog-message',
  standalone : true,
  imports: [ 
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
})
 export class DialogMessageComponent {
   width = 'auto';
   size = 'sm' ;
  
  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
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
