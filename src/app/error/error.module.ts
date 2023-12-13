// error.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { RouterModule, Routes } from '@angular/router';

const errorRoutes: Routes = [
  { path: '', component: ErrorComponent },
  // Add any additional routes related to the error feature here
];

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(errorRoutes),
  ],
})
export class ErrorModule {}
