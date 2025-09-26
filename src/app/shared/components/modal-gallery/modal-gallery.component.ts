import { Component } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './modal-gallery.component.html',
    styleUrls: ['./modal-gallery.component.scss']
})
export class GalleryComponent {
    images = [
        { src: '/assets/images/gallery1.jpg', alt: 'Foto 1' },
        { src: '/assets/images/gallery2.jpg', alt: 'Foto 2' },
        { src: '/assets/images/gallery3.jpg', alt: 'Foto 3' },
        { src: '/assets/images/gallery4.jpg', alt: 'Foto 4' },
        { src: '/assets/images/gallery5.jpg', alt: 'Foto 5' },
    ];
    isEnlarged = false; // Estado para la vista ampliada
    currentIndex = 0; // Índice de la imagen actual

    // Abrir vista ampliada al hacer clic en una imagen
    openEnlarged(index: number) {
        this.currentIndex = index;
        this.isEnlarged = true;
    }

    // Navegar a la imagen anterior
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }

    // Navegar a la imagen siguiente
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    // Cerrar la vista ampliada
    closeEnlarged() {
        this.isEnlarged = false;
    }
}