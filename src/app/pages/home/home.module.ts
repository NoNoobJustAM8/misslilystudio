import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfilePictureModule } from 'src/app/shared/components/profile-picture/profile-picture.module';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';
import { AboutComponent } from 'src/app/shared/components/modal-about/modal-about.component';
import { GalleryComponent } from 'src/app/shared/components/modal-gallery/modal-gallery.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from 'src/app/shared/components/modal-contact/modal-contact.component';

@NgModule({
    declarations: [
        HomeComponent,
        ModalComponent,
        ContactFormComponent,
        ContactComponent,
        AboutComponent,
        GalleryComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ProfilePictureModule,
        FormsModule,
    ]
})
export class HomeModule { }