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
    // Subscribe to getContactsObservable to receive updates automatically
    this.contactService.getContactsObservable().subscribe((updatedContacts) => {
      this.contacts = updatedContacts;
    });

    // Initial update of the contact list
    this.updateContactList();
  }

  addContact(): void {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      const addedSuccessfully: boolean | undefined = this.contactService.addContact(this.newContact);
      if (addedSuccessfully !== undefined && addedSuccessfully) {
        this.emailExistsError = false;
        this.newContact = { id: 0, name: '', email: '', phone: '' };
      } else {
        this.emailExistsError = true;
      }
    }
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact);
  }

  searchContacts(): void {
    // If the search keyword is empty, show the full list of contacts
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
      this.contactService.updateContact({ ...this.editedContact });
      this.editMode = false;
      this.editedContact = { id: 0, name: '', email: '', phone: '' };
    }
  }

  cancelEditMode(): void {
    this.editMode = false;
    this.editedContact = { id: 0, name: '', email: '', phone: '' };
  }

  private updateContactList(): void {
    this.contacts = this.contactService.getContacts();
  }
}
