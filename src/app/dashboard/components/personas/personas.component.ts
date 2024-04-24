import { Component, HostListener } from '@angular/core';
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
  isShowReiniciar: boolean = true;

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) { 
    this.onReloadPage();
  }

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
      this.list = resp.filter(item => item.isActive);   
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

  onReinciar(persona: IPersona){ 
 
    const PERSONA = this.list.find((x) => x.id_persona === persona.id_persona)
    let timeRestante
    if (PERSONA) {
      timeRestante = this.onGetNumbers(PERSONA.tiempo_restante);
    }
    const TIEMPO_A_FINALIZAR = new Date();
    TIEMPO_A_FINALIZAR.setMinutes(TIEMPO_A_FINALIZAR.getMinutes() + timeRestante.minutos);
    TIEMPO_A_FINALIZAR.setSeconds(TIEMPO_A_FINALIZAR.getSeconds() + timeRestante.segundos);
  
    const INTERVAL = setInterval(() => {
      const FECHA_ACTUAL = new Date();
      const MINUTOS = Math.floor((TIEMPO_A_FINALIZAR.getTime() - FECHA_ACTUAL.getTime()) / 60000);
      const SEGUNDOS = Math.floor((TIEMPO_A_FINALIZAR.getTime() - FECHA_ACTUAL.getTime()) / 1000) % 60;

      //BUSCAMOS A LA PERSONA QUE LE CALCULAREMOS EL TIEMPO SEGUND SU ID_PERSONA
    
      //VALIDAMOS QUE HAYA TERMINADO SU TIEMPO
      if (MINUTOS === 0 && SEGUNDOS === 0) {
        clearInterval(INTERVAL);
        if (PERSONA) {
          PERSONA.tiempo_restante = 'termino'; 
          PERSONA.isStatus = 'timeoff';
          this.personaSrv.update(PERSONA.id_persona, persona);
          this.onSound();
        }
      } else {
        if (MINUTOS > 0 || SEGUNDOS > 0) {
          if (PERSONA) {
            PERSONA.isStatus = 'processing';
            PERSONA.tiempo_restante = `${MINUTOS} min:${SEGUNDOS} seg`;
            this.personaSrv.update(PERSONA.id_persona, persona);
            PERSONA.isReload = true;
           // persona.tiempo_code = Number(MINUTOS + '.' + SEGUNDOS);
          }
        }
      }
    }, 100); // Update the countdown every 100 milliseconds
  }

  onInicilize(persona: IPersona){  
    const TIEMPO_A_FINALIZAR = new Date();  
      TIEMPO_A_FINALIZAR.setMinutes(TIEMPO_A_FINALIZAR.getMinutes() + persona.tiempo_code);
    
    const INTERVAL = setInterval(() => {
      const FECHA_ACTUAL = new Date();
      const MINUTOS = Math.floor((TIEMPO_A_FINALIZAR.getTime() - FECHA_ACTUAL.getTime()) / 60000);
      const SEGUNDOS = Math.floor((TIEMPO_A_FINALIZAR.getTime() - FECHA_ACTUAL.getTime()) / 1000) % 60;
      //BUSCAMOS A LA PERSONA QUE LE CALCULAREMOS EL TIEMPO SEGUND SU ID_PERSONA
      const PERSONA = this.list.find((x) => x.id_persona ===  persona.id_persona)
      //VALIDAMOS QUE HAYA TERMINADO SU TIEMPO
      if (MINUTOS === 0 && SEGUNDOS === 0) {
        clearInterval(INTERVAL); 
        if(PERSONA) {
          PERSONA.tiempo_restante = 'termino'
          PERSONA.isStatus = 'timeoff';
          this.personaSrv.update(PERSONA.id_persona, PERSONA);
          this.onSound(); 
        }
      } else {
        if (MINUTOS > 0 || SEGUNDOS > 0) {
          if(PERSONA){
            PERSONA.isStatus = 'processing'
            PERSONA.tiempo_restante = `${MINUTOS} min:${SEGUNDOS} seg`;
        //    PERSONA.tiempo_code = Number(MINUTOS + '.' + SEGUNDOS); 
            this.personaSrv.update(PERSONA.id_persona, PERSONA);
          } 
        }  
      }
    }, 1000);
  }

  onSound(){
    const audio = new Audio();
    audio.src = 'assets/sonidos/termina-juego.mp3';  
    audio.load();
    audio.play(); 

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 5000); // Stop the audio after 3 seconds 
  }

  onGetNumbers(lastTime : string): any{
    let timeRestante
    const regex = /(\d+) min:(\d+) seg/;
    const match = regex.exec(lastTime);
    if(match) {
      timeRestante = {
       minutos : Number(match[1]),
       segundos :  Number(match[2])
     }
    }
    return timeRestante || 0;
  }

  onReloadPage(){
    this.list.forEach(element => { 
      if (element.isStatus === "processing"){
        element.isReload = false;
      }
      this.personaSrv.update(element.id_persona, element);
    }); 
  }
  
  onFinish(data: IPersona){
    data.isActive = false;  
    this.personaSrv.update(data.id_persona, data);
  }

 

}
