// contact.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactFilterPipe } from '../contact-filter.pipe';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

const contactRoutes: Routes = [
  { path: '', component: ContactComponent },
  // Add any additional routes related to the contact feature here
];

@NgModule({
  declarations: [
    ContactComponent,
    ContactFilterPipe,
    ContactDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(contactRoutes),
  ],
})
export class ContactModule {}
