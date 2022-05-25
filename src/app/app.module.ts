import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { BreadcrumbsComponent } from './header/breadcrumbs/breadcrumbs.component';
import { MainPageComponent } from './header/main-page/main-page.component';
import { DocsComponent } from './header/docs/docs.component';
import { FaqComponent } from './header/faq/faq.component';
import { SettingsComponent } from './header/settings/settings.component';
import { PopupComponent } from './header/popup/popup.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './header/registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { zipDirective } from './header/registration/zipcode-dir';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { MyProfileComponent } from './my-profile/my-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    MainPageComponent,
    DocsComponent,
    FaqComponent,
    SettingsComponent,
    PopupComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    zipDirective,
    LoadingSpinnerComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatChipsModule,
    MatSelectModule
  ],
  providers: [
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
