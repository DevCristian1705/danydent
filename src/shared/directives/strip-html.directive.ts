import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStripHtml]'
})
export class StripHtmlDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set appStripHtml(content: string) {
    if (content) {
      const strippedText = content.replace(/<[^>]*>/g, '');
      this.renderer.setProperty(this.el.nativeElement, 'textContent', strippedText);
    }
  }
}
