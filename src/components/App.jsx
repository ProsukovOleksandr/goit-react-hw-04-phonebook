import { useState, useEffect } from 'react';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleAddContact = contact => {
    const { name } = contact;
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts([...contacts, contact]);
  };
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);
  
  useEffect(() => {
    const localStorageContacts = JSON.parse(
      window.localStorage.getItem('contacts')
    );
    if (localStorageContacts) {
      setContacts(localStorageContacts);
    }
  }, []);

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  const handleFilter = e => {
    setFilter(e.target.value);
  };
  const filterContacts = () => {
    if (filter === '') {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onFilter={handleFilter} filter={filter} />
      <ContactList
        contacts={filterContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
