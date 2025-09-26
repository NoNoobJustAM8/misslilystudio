import { Component } from '@angular/core';
import { EmailService } from '../../services/email/email.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
    formData = { name: '', email: '', message: '' };
    successMessage = '';

    constructor(private emailService: EmailService) { }

    onSubmit() {
        console.log('mensaje enviado con exito!')
        // this.emailService.sendEmail(this.formData).subscribe(
        //     response => {
        //         this.successMessage = '¡Mensaje enviado con éxito!';
        //         this.formData = { name: '', email: '', message: '' };
        //     },
        //     error => {
        //         this.successMessage = 'Error al enviar el mensaje. Inténtalo de nuevo.';
        //     }
        // );
    }
}