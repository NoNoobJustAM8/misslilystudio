import { Component, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    open() {
        this.isOpen = true;
        this.renderer.addClass(this.el.nativeElement, 'open');
    }

    closeModal() {
        this.isOpen = false;
        this.renderer.removeClass(this.el.nativeElement, 'open');
        this.close.emit();
    }
}