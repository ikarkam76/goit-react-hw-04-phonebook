import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { FormButton, FormContainer, FormLabel } from './ContactForm.styled';

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter name!'),
  number: yup.number().required('Please enter number!'),
});

const validate = value => {
  let errorMessage;
  if (!/^[a-zA-Z]/.test(value)) {
    errorMessage = 'The name must start with letters!';
  }
  return errorMessage;
};

const initialValues = {
  name: '',
  number: '',
  id: '',
};

const ContactForm = ({formSubmit}) => {
    const handleSubmit = (values, { resetForm }) => {
        values.id = nanoid();
        formSubmit(values);
        resetForm();
    }
    
    return (
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form autoComplete="off">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Field validate={validate} name="name" type="text" />
            <ErrorMessage component="div" name="name" />
            <FormLabel htmlFor="tel">Number</FormLabel>
            <Field name="number" type="tel" />
            <ErrorMessage component="div" name="number" /><br/>
            <FormButton type="submit">Add contact</FormButton>
          </Form>
        </Formik>
      </FormContainer>
    );
};

export default ContactForm;

ContactForm.propTypes = {
  formSubmit: PropTypes.func.isRequired,
}