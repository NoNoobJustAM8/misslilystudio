import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent {
  @Input() imageUrl: string = '';
  @Input() altText: string = 'Foto de perfil';
  @Input() set size(value: string) {
    this._size = value;
    // Pasar el tamaño como variable CSS al elemento raíz
    document.documentElement.style.setProperty('--size', value);
  }
  get size(): string {
    return this._size;
  }
  private _size: string = '100px'; // Valor por defecto
}