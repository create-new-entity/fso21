import React from 'react';

import { Field } from 'formik';
import { Dropdown, Form, Input } from 'semantic-ui-react';

interface DropDownProps {
  name: string,
  label: string,
  options: {
    text: string,
    value: string
  }[],
  placeholder: string
}

interface TextFieldProps {
  name: string,
  label: string,
  placeholder: string
}

export const DropDownField = ({ name, label, options, placeholder }: DropDownProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field name={name} component={Dropdown} options={options} placeholder={placeholder}/>
    </Form.Field>
  );
};

export const TextField = ({ name, label, placeholder }: TextFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field name={name} placeholder={placeholder} component={Input}/>
    </Form.Field>
  );
};