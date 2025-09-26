import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ContactComponent } from '../modal-contact/modal-contact.component'; // Actualizamos
import { AboutComponent } from '../modal-about/modal-about.component';
import { GalleryComponent } from '../modal-gallery/modal-gallery.component';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() isOpen = false;
    @Input() componentType: string = 'Contact';
    @Output() close = new EventEmitter<void>();
    @ViewChild('modalContent', { read: ViewContainerRef }) modalContent!: ViewContainerRef;

    constructor(private el: ElementRef, private renderer: Renderer2, private resolver: ComponentFactoryResolver) { }

    open() {
        this.isOpen = true;
        this.renderer.addClass(this.el.nativeElement, 'open');
        this.loadComponent();
    }

    closeModal() {
        this.isOpen = false;
        this.renderer.removeClass(this.el.nativeElement, 'open');
        this.modalContent.clear();
        this.close.emit();
    }

    private loadComponent() {
        this.modalContent.clear();
        let componentFactory;

        switch (this.componentType) {
            case 'Contact':
                componentFactory = this.resolver.resolveComponentFactory(ContactComponent); // Usamos ModalContactComponent
                break;
            case 'About me':
                componentFactory = this.resolver.resolveComponentFactory(AboutComponent);
                break;
            case 'Gallery':
                componentFactory = this.resolver.resolveComponentFactory(GalleryComponent);
                break;
            default:
                return;
        }

        this.modalContent.createComponent(componentFactory);
    }
}