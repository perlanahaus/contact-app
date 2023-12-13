import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { ErrorComponent } from '../error/error.component';
import { SigninComponent } from '../signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  {
    path: 'contacts',
    loadChildren: () =>
      import('../contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('../error/error.module').then(
        (m) => m.ErrorModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('../signin/signin.module').then(
        (m) => m.SigninModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
