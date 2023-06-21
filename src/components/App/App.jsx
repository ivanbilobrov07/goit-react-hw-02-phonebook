import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { ContactForm } from 'components/ContactForm';
import { FilterContacts } from 'components/FilterContacts';
import { ContactList } from 'components/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  getFilteredValue = filterValue => {
    this.setState({ filter: filterValue });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  findContactByName = nameValue => {
    return this.state.contacts.find(({ name }) => name === nameValue);
  };

  addContact = data => {
    const id = nanoid();

    if (this.findContactByName(data.name)) {
      Notiflix.Notify.failure(
        `You already have ${data.name} in your phonebook`
      );
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, { ...data, id }],
    }));
  };

  removeContact = idValue => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== idValue),
    }));
  };

  render() {
    const contacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <FilterContacts getFilteredValue={this.getFilteredValue} />
        <ContactList removeContact={this.removeContact} contacts={contacts} />
      </div>
    );
  }
}
