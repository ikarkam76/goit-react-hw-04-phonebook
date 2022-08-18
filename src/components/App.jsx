import React, { Component } from "react";
import ContactForm from "components/ContactForm";
import ContactList from "components/ContactList";
import FilterContacts from "components/FilterContacts";
import AppContainer from "components/App.styled";


class App extends Component {
  state = {
    contacts: [
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts: contacts });
    };
  }
  

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    };
  }

  handleContactFormSubmit = values => {
    this.setState({ contacts: [values, ...this.state.contacts] });
  };

  deleteContact = contactId => {
    this.setState(prevstate => ({
      contacts: prevstate.contacts.filter(contact => contact.id !== contactId),
    })
  );
};

  changeFilter = ev => {
    this.setState({filter: ev.target.value})
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return (
      <AppContainer>
        <h1>Phonebook</h1>
        <ContactForm formSubmit={this.handleContactFormSubmit} />
        <h2>Contacts</h2>
        <FilterContacts value={filter} onChange={this.changeFilter} />
        <ContactList contacts={filteredContacts} onDelete={this.deleteContact} />
      </AppContainer>
    );
  }
};

export default App ;

