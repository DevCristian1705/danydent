import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild, ElementRef, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 
const getStyles = (...args: string[]) => [...args].filter(Boolean)

export enum EInputValidation {
  Number = 'number',
  Alpha = 'alpha',
  Alphanumeric = 'alphanumeric',
  Text = 'text',
}

@Component({
  selector: 'dropdown-list-library',
  standalone: true,
  imports: [ 
    CommonModule
  ], 
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss'],
})
export class DropdownListComponent implements OnChanges {
  @ViewChild('cbxDropDownList')  cbxDropDownList!: ElementRef;
  @Input() idTextField = 'idTextField';
  @Input() placeholder = ' ';
  @Input() label = 'label';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() value = '';
  @Input() size = 'md';
  @Input() paste = true;
  @Input() msgError : string = "";
  @Input() width = '';
  @Input() height = '48px';
  @Input() icon = '';
  @Input() inputValidation!: EInputValidation;
  @Output() public valueChanged = new EventEmitter();
  @Output() public blurred = new EventEmitter();
  @Output() public dataValue = new EventEmitter();
  @Input() typeInput =  "ClassicInput" ;
  @Input() loading = false;
  @Input() isMinutos = false;
  @Input() readOnly = false;
  @Input() data: any = [];
  hasError = false;
  expression!: RegExp;
  isDropdownOpen: boolean = false;
  public typeView: "FULL" | "FOUND" | "EMPTY" | "ERROR" | "LOADING" | "" = "";

  classInput = {
    'text-input': true,
    'error-input': false
  };
  arrow = 'arrow-down-gris';

  public get typeInputs(): string[] {
    return getStyles(this.typeInput)
  }
  constructor(
    private elementRef: ElementRef
  ) {
    console.log(this.data);
  }
  ngOnChanges(changes: SimpleChanges) {

    if (this.msgError != "") {
      this.hasError = true;
      this.classInput['error-input'] = this.hasError;
      this.classInput['text-input'] = !this.hasError;
    }
    if (this.msgError == "") {
      this.hasError = false;
      this.classInput['error-input'] = this.hasError;
      this.classInput['text-input'] = !this.hasError;
    }

  }

  onChange(target: any) {
    switch (this.inputValidation) {
      case EInputValidation.Number:
        this.expression = /[A-Za-zÑÁÉÍÓÚñáéíóú`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Alpha:
        this.expression = /[0-9`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Alphanumeric:
        this.expression = /[`~!¡@#$%^&*()_|+\-=?;:'",.<>° ]/g;
        break;
      case EInputValidation.Text:
        this.expression = /[0-9`~!¡@#$%^&*()_|+\-=?;:'",.<>°]/g;
        break;
    }
    if (this.expression) {
      target.value = target.value
        .replace(this.expression, '');
    }
  
    this.valueChanged.emit(target.value);
  }

  UpdateArrow() {
    return this.typeView === 'FULL' ? this.arrow = 'arrow-up' : this.arrow = 'arrow-down-gris';
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
      this.typeView = 'EMPTY';
      this.UpdateArrow();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) this.typeView = 'FULL';
    else
      this.typeView = 'EMPTY';
    this.UpdateArrow();
  }

  getElement(element: any) {
    this.dataValue.emit(element);
  }

}

