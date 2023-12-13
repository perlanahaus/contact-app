// registration.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { RouterModule, Routes } from '@angular/router';

const registrationRoutes: Routes = [
  { path: '', component: RegistrationComponent },
  // Add any additional routes related to the registration feature here
];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(registrationRoutes),
  ],
})
export class RegistrationModule {}
