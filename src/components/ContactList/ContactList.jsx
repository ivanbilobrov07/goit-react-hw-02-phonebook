import PropTypes from 'prop-types';

import { ContactItem } from 'components/ContactItem';

export const ContactList = ({ contacts, removeContact }) => {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <ContactItem
          removeContact={removeContact}
          key={id}
          id={id}
          name={name}
          number={number}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  removeContact: PropTypes.func.isRequired,
};
