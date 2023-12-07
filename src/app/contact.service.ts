import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
//import { faker } from '@faker-js/faker';
import { randEmail, randFullName, randPhoneNumber } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsCollection: AngularFirestoreCollection<Contact>;
  private contactsSubject = new Subject<Contact[]>();
  private contacts: Contact[] = [];

  constructor(private firestore: AngularFirestore) {
    this.contactsCollection = this.firestore.collection<Contact>('contacts');
    this.loadContacts();
  }

  getContactsObservable(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact): Promise<void> {
    const newId = this.firestore.createId();
    contact.id = newId;

    return this.contactsCollection.doc(newId).set(contact)
      .then(() => {
        this.notifyContactsUpdate();
      })
      .catch((error) => {
        console.error('Error adding contact:', error);
      });
  }

  deleteContact(id: string): Promise<void> {
    console.log('Deleting contact with ID:', id);

    return this.contactsCollection.doc(id).delete()
      .then(() => {
        console.log('Contact deleted successfully!');
        this.loadContacts();
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  }

  updateContact(updatedContact: Contact): Promise<void> {
    if (updatedContact.id !== undefined) {
      const contactId: string = updatedContact.id.toString();
      console.log('Updating contact with ID:', contactId);

      return this.contactsCollection.doc(contactId).update(updatedContact)
        .then(() => {
          console.log('Contact updated successfully!');
          this.loadContacts();
        })
        .catch((error) => {
          console.error('Error updating contact:', error);
        });
    } else {
      console.error('Attempted to update a contact without a valid ID.');
      return Promise.reject('Invalid ID');
    }
  }
  async generateRandomContacts(count: number): Promise<void> {
    const batch = this.firestore.firestore.batch();

    for (let i = 0; i < count; i++) {
      const newContactId = this.firestore.createId(); // Manually generate an ID
      const newContact: Contact = {
        id: newContactId,
        //name: faker.name.firstName() + ' ' + faker.name.lastName(),
        name: randFullName(),
       // email: faker.internet.email(),
        //phone: faker.phone.number(),
        email: randEmail(),
        phone: randPhoneNumber(),
  
      };
      const newContactRef = this.contactsCollection.doc(newContactId).ref;
      batch.set(newContactRef, newContact);
    }

    await batch.commit();
  }

  searchContact(keyword: string): Observable<Contact[]> {
    return this.firestore.collection<Contact>('contacts', ref =>
      ref.where('name', '>=', keyword.toLowerCase()).where('name', '<=', keyword.toLowerCase() + '\uf8ff')
    ).valueChanges();
  }
  
  private loadContacts(): void {
    this.contactsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = +a.payload.doc.id;
        return Object.assign({}, { id }, data);
      }))
    ).subscribe(contacts => {
      this.contacts = contacts;
      this.notifyContactsUpdate();
    });
  }

  private notifyContactsUpdate(): void {
    this.contactsSubject.next([...this.contacts]);
  }


}
