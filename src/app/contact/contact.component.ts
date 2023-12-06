import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  newContact: Contact = { id: 0, name: '', email: '', phone: '' };
  searchKeyword: string = '';
  emailExistsError: boolean = false;
  editMode = false;
  editedContact: Contact = { id: 0, name: '', email: '', phone: '' };

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.updateContactList();
  }

  updateContactList() {
    this.contacts = this.contactService.getContacts();
  }

  addContact(): void {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      const addedSuccessfully: boolean | undefined = this.contactService.addContact(this.newContact);
      if (addedSuccessfully !== undefined && addedSuccessfully) {
        this.emailExistsError = false;
        this.updateContactList();
        this.newContact = { id: 0, name: '', email: '', phone: '' };
      } else {
        this.emailExistsError = true;
      }
    }
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.updateContactList();
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact);
    this.updateContactList();
  }

  searchContacts(): void {
    if (this.searchKeyword.trim() !== '') {
      this.contacts = this.contactService.searchContact(this.searchKeyword);
    } else {
      this.updateContactList();
    }
  }

  enableEditMode(contact: Contact): void {
    this.editMode = true;
    this.editedContact = { ...contact };
  }

  updateEditedContact(): void {
    const index = this.contacts.findIndex(contact => contact.id === this.editedContact.id);
    if (index !== -1) {
      this.contacts[index] = { ...this.editedContact };
      this.editMode = false;
      this.editedContact = { id: 0, name: '', email: '', phone: '' };
    }
  }

  cancelEditMode(): void {
    this.editMode = false;
    this.editedContact = { id: 0, name: '', email: '', phone: '' };
  }
}
