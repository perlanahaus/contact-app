import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent {
  @Input() contact: Contact | undefined;
  @Output() editClicked = new EventEmitter<void>();

  editContact(): void {
    this.editClicked.emit();
  }
}
