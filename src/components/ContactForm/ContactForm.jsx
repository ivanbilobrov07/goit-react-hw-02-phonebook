import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

const nameExpression = RegExp(
  "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
);

const contactSchema = object({
  name: string()
    .required()
    .min(2, 'Name must be at least 2 characters')
    .matches(
      nameExpression,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: string()
    .required()
    .min(6, 'Number must be at least 6 characters')
    .matches(
      /^\+?\d{1,4}[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

export const ContactForm = ({ addContact }) => {
  const handleFormSubmit = (values, { resetForm }) => {
    addContact(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactSchema}
      onSubmit={handleFormSubmit}
    >
      <Form>
        <label className={css.contact_form_group}>
          <span className={css.contact_form_label}>Name</span>
          <Field
            className={css.contact_form_input}
            type="text"
            name="name"
            required
          />
          <ErrorMessage
            className={css.contact_form_error}
            name="name"
            component="span"
          />
        </label>
        <label className={css.contact_form_group}>
          <span className={css.contact_form_label}>Number</span>
          <Field
            className={css.contact_form_input}
            type="tel"
            name="number"
            required
          />
          <ErrorMessage
            className={css.contact_form_error}
            name="number"
            component="span"
          />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
