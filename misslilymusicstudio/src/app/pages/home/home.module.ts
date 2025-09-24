import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfilePictureModule } from 'src/app/shared/components/profile-picture/profile-picture.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ProfilePictureModule 
    ]
})
export class HomeModule { }