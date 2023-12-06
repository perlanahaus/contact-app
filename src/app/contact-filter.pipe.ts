import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {
  transform(contacts: Contact[], keyword: string): Contact[] {
    if (!contacts || !keyword) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
