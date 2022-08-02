import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
  @HostListener ('mouseenter') onMouseEnter(){
    this.setBorder('#009688');
  }

  @HostListener ('mouseleave') onMouseLeave(){
    this.setBorder('#f5f5f5');
  }
  constructor(private el: ElementRef) {
    this.setBorder('#f5f5f5');
    this.setHeight(180);
}

private setBorder(color: string) {
    let border = 'solid 4px ' + color;
    this.el.nativeElement.style.border = border;
}

private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
}

}
