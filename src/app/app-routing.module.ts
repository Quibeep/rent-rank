import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './header/main-page/main-page.component';
import { FaqComponent } from './header/faq/faq.component';
import { DocsComponent } from './header/docs/docs.component';
import { SettingsComponent } from './header/settings/settings.component';
import { PopupComponent } from './header/popup/popup.component';
import { RegistrationComponent } from './header/registration/registration.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdvertsComponent } from './adverts/adverts.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'docs', component: DocsComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'login', component: PopupComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'my-profile', component: MyProfileComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: 'adverts', component: AdvertsComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
