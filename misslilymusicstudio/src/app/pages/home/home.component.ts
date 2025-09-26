import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Matter from 'matter-js';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  shouldAnimate = false;
  @ViewChild('bubblesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('modal') modal!: ModalComponent; // Referencia al modal

  private bubbles = [
    { label: 'Home', route: '/home', color: 'rgba(64, 224, 208, 0.8)' }, // Tiffany Blue
    { label: 'About me', route: '/about', color: 'rgba(0, 191, 255, 0.8)' }, // Electric Blue
    { label: 'Gallery', route: '/gallery', color: 'rgba(255, 192, 203, 0.8)' }, // Rose Pink
    { label: 'Contact', route: '/contact', color: 'rgba(255, 219, 102, 0.8)' }, // Mustard
  ];

  private engine!: Matter.Engine;
  private render!: Matter.Render;
  private runner!: Matter.Runner;
  private mouseConstraint!: Matter.MouseConstraint;
  private bubbleBodies: Matter.Body[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('homeLoaded')) {
      this.shouldAnimate = true;
      sessionStorage.setItem('homeLoaded', 'true');
      console.log('Animación activada: shouldAnimate =', this.shouldAnimate);
    } else {
      this.shouldAnimate = true;
      console.log('Animación omitida (ya cargado), forzando shouldAnimate =', this.shouldAnimate);
    }
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const calculatePositions = (width: number) => {
      let spacing = 0;
      if (width < 600) {
        spacing = width / 5;
      } else if (width <= 1024) {
        spacing = width / 6;
      } else {
        spacing = width / 8;
      }
      const centerX = width / 2;
      const startX = centerX - (spacing * (this.bubbles.length - 1)) / 2;
      return this.bubbles.map((_, index) => startX + index * spacing);
    };

    const initialXPositions = calculatePositions(width);
    const initialY = height * 0.7;

    this.engine = Matter.Engine.create();
    const world = this.engine.world;
    world.gravity.y = -0.09;
    this.render = Matter.Render.create({
      canvas: canvas,
      engine: this.engine,
      options: { width, height, wireframes: false, background: 'transparent' }
    });

    Matter.World.add(world, [
      Matter.Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent' } }),
      Matter.Bodies.rectangle(width / 2, height, width, 10, { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent' } }),
      Matter.Bodies.rectangle(0, height / 2, 10, height, { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent' } }),
      Matter.Bodies.rectangle(width, height / 2, 10, height, { isStatic: true, render: { fillStyle: 'transparent', strokeStyle: 'transparent' } })
    ]);

    this.bubbles.forEach((bubble, index) => {
      const body = Matter.Bodies.circle(initialXPositions[index], initialY, 70, {
        render: { fillStyle: bubble.color, strokeStyle: bubble.color, lineWidth: 2 },
        restitution: 0.8,
        frictionAir: 0.001
      });
      (body as any).route = bubble.route;
      (body as any).label = bubble.label;
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });
      this.bubbleBodies.push(body);
      Matter.World.add(world, body);
    });

    this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: Matter.Mouse.create(canvas),
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Matter.World.add(world, this.mouseConstraint);

    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);

    Matter.Render.run(this.render);
    Matter.Events.on(this.mouseConstraint, 'mouseup', (event: any) => {
      console.log('Mouse up event:', event);
      const mouse = event.mouse;
      const bodies = Matter.Composite.allBodies(world);
      const hit = Matter.Query.point(bodies, mouse.position)[0];
      console.log('Este es el hit:', hit);
      if (hit) {
        const label = (hit as any).label;
        if (label != 'Home') {
          this.openModal(label);
        }
      }
    });

    Matter.Events.on(this.render, 'afterRender', () => {
      const ctx = this.render.context;
      ctx.font = '24px Limelight';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';

      this.bubbleBodies.forEach(body => {
        const label = (body as any).label;
        if (label) {
          ctx.fillText(label, body.position.x, body.position.y);
        }
      });
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.render.options.width = window.innerWidth;
      this.render.options.height = window.innerHeight;

      const newXPositions = calculatePositions(window.innerWidth);
      this.bubbleBodies.forEach((body, index) => {
        Matter.Body.setPosition(body, { x: newXPositions[index], y: initialY });
      });
      Matter.Render.lookAt(this.render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
      });
    });

    Matter.Render.world(this.render);
  }

  openModal(label: string) {
    if (this.modal) {
      this.modal.componentType = label; // Pasar el tipo de componente
      this.modal.open();
    }
  }
}