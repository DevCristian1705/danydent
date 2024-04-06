import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss'
})
export class PreloaderComponent {

  @Input() isShow : boolean = false;
  @Input() texto : string = "";

  constructor() {
  //  this.isShow = !this.isShow
  }
}
