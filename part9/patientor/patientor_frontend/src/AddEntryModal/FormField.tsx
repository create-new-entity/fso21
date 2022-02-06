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
  placeholder: string,
  fluid?: boolean,
  multiple?: boolean,
  search?: boolean,
  selection?: boolean
}

interface TextFieldProps {
  name: string,
  label: string,
  placeholder: string,
  fluid?: boolean
}

export const DropDownField = ({ name, label, ...props }: DropDownProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field name={name} component={Dropdown} {...props}/>
    </Form.Field>
  );
};

export const TextField = ({ name, label, placeholder, ...props }: TextFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field name={name} placeholder={placeholder} component={Input} {...props}/>
    </Form.Field>
  );
};