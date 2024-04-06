import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment"; 
import { AppRoutingModule } from "./app.routes";
import { ReactiveFormDirective } from "../shared/directives/reactiveForm.directive";
import { TranslateModule } from "@ngx-translate/core";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent, 
  ],

  imports: [ 
    CommonModule,
    AppRoutingModule,
    BrowserModule, 
    ReactiveFormsModule,
    ReactiveFormDirective, 
    HttpClientModule,  
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TranslateModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ], 
  providers:[
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


})
export class AppModule {}
