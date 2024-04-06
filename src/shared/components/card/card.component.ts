import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 
const getStyles = (...args: string[]) => ["nombreBotton", ...args].filter(Boolean)

@Component({
  selector: 'app-card',
  standalone: true,
  imports:[CommonModule]
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title : string = "";
  @Input() id : string = "";
  @Input() type : string = "";
  @Input() dataHover  : string = "";
  @Input() dataArray! : Observable<any[]>;
 
  public get typeClass(): string[] {
    return getStyles(this.type)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
