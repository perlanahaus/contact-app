// signin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin.component';
import { RouterModule, Routes } from '@angular/router';

const signinRoutes: Routes = [
  { path: '', component: SigninComponent },
  // Add any additional routes related to the sign-in feature here
];

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(signinRoutes),
  ],
})
export class SigninModule {}
