import { useState, useEffect } from "react";
import ContactForm from "components/ContactForm";
import ContactList from "components/ContactList";
import FilterContacts from "components/FilterContacts";
import AppContainer from "components/App.styled";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {  
    if (!contacts[0]) {
      setContacts(JSON.parse(localStorage.getItem('contacts')));
      console.log('open');
      return;
    }
    console.log('next');
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts])

  const handleContactFormSubmit = values => {
    setContacts([values, ...contacts]);
  };

  const deleteContact = contactId => {
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

