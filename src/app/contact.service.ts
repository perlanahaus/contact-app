import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private nextId: number = 1;

  constructor() {}

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(contact: Contact): boolean {
    const emailExists = this.contacts.some(existingContact => existingContact.email === contact.email);
    if (emailExists) {
      return false;
    } else {
      contact.id = this.nextId++;
      this.contacts.push(contact);
      return true;
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  searchContact(keyword: string): Contact[] {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
