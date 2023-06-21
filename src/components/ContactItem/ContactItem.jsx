import PropTypes from 'prop-types';

export const ContactItem = ({ name, number, removeContact, id }) => {
  return (
    <li>
      {name}: {number} <button onClick={() => removeContact(id)}>Delete</button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  removeContact: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
