import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PreloaderComponent } from '../../../../shared/components/preloader/preloader.component';
import { IPersona } from '../../../../shared/interfaces/personas';
import { PersonasServices } from '../../services/pacientes.srv'; 
import { AddPersonasComponent } from './add-personas/add-personas.component';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [ 
    MatDialogModule, 
    ButtonComponent,  
    CommonModule,
    MatTableModule,
    PreloaderComponent
  ],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.scss'
})
export class PersonasComponent {

  list : IPersona[] = [];
  displayedColumns: string[] = [ 'names','tiempo', 'tiempo_restante', 'accion'];
  isLoading: boolean = false;
  tiempo_restante: string = "";
 

  constructor( 
    private personaSrv: PersonasServices,   
    public dialog: MatDialog, 
    public router: Router,  
  ) { 
    
  }

  ngOnInit(){
   this.onLoadList();
  }

  onLoadList(){
    this.isLoading = true;
    this.personaSrv.getListPersona().subscribe(resp => {
      this.list = resp; 
      this.isLoading = false;
    });
   }
      
  onAdd() { 
      this.dialog.open(AddPersonasComponent, {
      disableClose: true, width: '350px'
    });  
  }
  
  onUpdate(persona :IPersona) {    
    const dialogRef = this.dialog.open(AddPersonasComponent, {
      disableClose: false, width: '350px', data: persona
    }); 
    dialogRef.afterClosed().subscribe((resp: boolean) => { 
      if(resp) this.personaSrv.update(persona.id_persona, persona);
    });  
  }

  onInicilize(tiempo: number){ 
    console.log('Tiempo terminado',tiempo);
    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + tiempo);
  
    const interval = setInterval(() => {
      const currentTime = new Date();
      const diffInMinutes = Math.floor((endTime.getTime() - currentTime.getTime()) / 60000);
      const diffInSeconds = Math.floor((endTime.getTime() - currentTime.getTime()) / 1000) % 60;
  
      if (diffInMinutes <= 0 && diffInSeconds <= 0) {
        clearInterval(interval);
        console.log('Tiempo terminado');
      } else {
        this.tiempo_restante = `${diffInMinutes} min:${diffInSeconds} seg`;
      }
    }, 1000);
  }

  onFinish(data: IPersona){
    data.isActive = false;  
    this.personaSrv.update(data.id_persona, data);
  }


}
