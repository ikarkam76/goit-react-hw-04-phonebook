import React from "react";
import PropTypes from 'prop-types';
import {Item, List} from "components/ContactList/ContactList.styled";



const ContactList = ({ contacts, onDelete }) => {
    return (
      <List>
        {contacts.map(contact => (
          <Item key={contact.id}>
            <p>{contact.name}: {contact.number}</p>
            <button onClick={()=>onDelete(contact.id)}>Delete</button>
          </Item>
        ))}
      </List>
    );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  contact: PropTypes.objectOf({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;