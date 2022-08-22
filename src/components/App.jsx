import { useState, useEffect } from "react";
import ContactForm from "components/ContactForm";
import ContactList from "components/ContactList";
import FilterContacts from "components/FilterContacts";
import AppContainer from "components/App.styled";

const App = () => {
  const [contacts, setContacts] = useState(() => { return JSON.parse(localStorage.getItem('contacts')) ?? []; });
  const [filter, setFilter] = useState('');

  useEffect(() => {  
    if (!contacts[0]) {
        return;
      }
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts])

  const handleContactFormSubmit = values => {
    if (Number(values.name)) {
      alert('The name must contain letters!');
      return;
    }
      contacts.find(contact => contact.name === values.name)
        ? alert('This name is already in contacts!')
        : setContacts([values, ...contacts]);
  };

  const deleteContact = contactId => {
    if (contacts.length === 1) {
      window.localStorage.removeItem('contacts');
      setContacts([]);
      return;
    }
      setContacts(contacts.filter(contact => contact.id !== contactId));
};

  const changeFilter = ev => {
    setFilter(ev.target.value);
    
  }

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return (
      <AppContainer>
        <h1>Phonebook</h1>
        <ContactForm formSubmit={handleContactFormSubmit} />
        <h2>Contacts</h2>
        <FilterContacts value={filter} onChange={changeFilter} />
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      </AppContainer>
    );
  }

export default App ;

