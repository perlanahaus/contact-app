// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { ContactComponent } from './contact/contact.component';
import { ContactFilterPipe } from './contact-filter.pipe'; 
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './auth.service';
import { ContactService } from './contact/contact.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
//import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';
@NgModule({
  declarations: [
    AppComponent,
    //ContactComponent,
   // ContactFilterPipe,
   // ContactDetailComponent,
    //RegistrationComponent,
    //ErrorComponent,
   // SigninComponent
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    
    //TranslocoModule,
  ],
  providers: [AuthService, ContactService, 
    //{
    //provide: TRANSLOCO_CONFIG,
    //useValue: {
      //availableLangs: ['en', 'de'],
      //defaultLang: 'en',
      //fallbackLang: 'en',
     // prodMode: environment.production,
   // } as TranslocoConfig
 // }
],
  bootstrap: [AppComponent]
})

export class AppModule { }
