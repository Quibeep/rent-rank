import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './header/main-page/main-page.component';
import { FaqComponent } from './header/faq/faq.component';
import { DocsComponent } from './header/docs/docs.component';
import { SettingsComponent } from './header/settings/settings.component';
import { PopupComponent } from './header/popup/popup.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'docs', component: DocsComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'login', component: PopupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
