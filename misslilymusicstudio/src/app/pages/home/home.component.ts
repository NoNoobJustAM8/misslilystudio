import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shouldAnimate = false; // Controla si la animación debe ejecutarse

  ngOnInit(): void {
    // Ejecutar animación solo si es la primera carga
    this.shouldAnimate = true;
  }
}