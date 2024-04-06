import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {

  currentDate : Date = new Date();
  anioActual = this.currentDate.getFullYear();
  email :string = 'criizt.mart@gmail.com';
  
  constructor() { }


 
}
