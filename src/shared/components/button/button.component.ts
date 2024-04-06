import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
 
const getStyles = (...args: string[]) => ["nombreBotton", ...args].filter(Boolean)

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ 
    CommonModule
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent   {

  @Input() nombreBotton: string | null = "";
  @Input() isDisabled: boolean | null = false;
  @Input() size : string | null = "";
  @Input() isActive: boolean | null = false;
  @Input() urlimagen : string | null = "";
  @Input() loadingdButton = false;
  @Input() type: "BottonPrimary" | "BottonLandingPrimary"| "BottonIcon" | "BottonGoogle"| "Classic" | "BottonLanding" | "BottonPrimaryBlock" = "BottonPrimary";
  @Output() clicked = new EventEmitter();
  

  public get typeClass(): string[] {
    return getStyles(this.type)
  }

  public get typeSize(): string {
    return `${this.type}__${this.size}`;
  }


  constructor() { }

  onClicked() {
    if (!this.isDisabled) {
      this.clicked.emit();
    }
  } 

}
