import React from 'react';

import { FieldProps } from 'formik';
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
  inline?: boolean,
  field: FieldProps
}

interface TextFieldProps {
  name: string,
  label: string,
  placeholder: string,
  field: FieldProps
}

export const DropDownField = ({ label, field, ...props }: DropDownProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Dropdown {...field} {...props}/>
    </Form.Field>
  );
};

export const TextField = ({ label, field, ...props }: TextFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Input {...field} {...props} fluid/>
    </Form.Field>
  );
};