import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  newContact: Contact = { id: '', name: '', email: '', phone: '' };
  searchKeyword: string = '';
  emailExistsError: boolean = false;
  selectedContact: Contact | null = null;
  editMode = false;
  editedContact: Contact = { id: '', name: '', email: '', phone: '' };

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContactsObservable().subscribe((updatedContacts) => {
      this.contacts = updatedContacts;
    });

    this.updateContactList();
  }

  async addContact(): Promise<void> {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      try {
        await this.contactService.addContact(this.newContact);
        this.emailExistsError = false;
        this.newContact = { id: '', name: '', email: '', phone: '' };
      } catch (error) {
        console.error('Error adding contact:', error);
        this.emailExistsError = true;
      }
    }
  }

  async deleteContact(id: string): Promise<void> {
    try {
      await this.contactService.deleteContact(id);
      this.updateContactList();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }

  async updateContact(contact: Contact): Promise<void> {
    try {
      await this.contactService.updateContact(contact);
      this.updateContactList();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }

  searchContacts(): void {
    if (this.searchKeyword.trim() !== '') {
      this.contactService.searchContact(this.searchKeyword).subscribe((result) => {
        this.contacts = result;
      });
    } else {
      this.updateContactList();
    }
  }

  viewDetails(contact: Contact): void {
    this.selectedContact = this.selectedContact === contact ? null : contact;
  }

  enableEditMode(contact: Contact): void {
    this.editMode = true;
    this.editedContact = { ...contact };
  }

  async updateEditedContact(): Promise<void> {
    const index = this.contacts.findIndex((contact) => contact.id === this.editedContact.id);
    if (index !== -1) {
      try {
        await this.contactService.updateContact({ ...this.editedContact });
        if (this.selectedContact && this.selectedContact.id === this.editedContact.id) {
          this.selectedContact = { ...this.editedContact };
        }

        this.editMode = false;
        this.editedContact = { id: '', name: '', email: '', phone: '' };
        this.updateContactList();
      } catch (error) {
        console.error('Error updating edited contact:', error);
      }
    }
  }

  cancelEditMode(): void {
    this.editMode = false;
    this.editedContact = { id: '', name: '', email: '', phone: '' };
  }

  private updateContactList(): void {
    this.contactService.getContactsObservable().pipe(take(1)).subscribe((contacts) => {
      this.contacts = contacts;
    });
  }
}
