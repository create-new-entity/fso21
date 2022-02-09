import React from 'react';

import { ErrorMessage, FieldProps, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form, Input } from 'semantic-ui-react';


interface TextFieldProps {
  name: string,
  label: string,
  placeholder: string,
  field: FieldProps
}

export const TextField = ({ label, field, ...props }: TextFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Input {...field} {...props} fluid/>
    </Form.Field>
  );
};

export const HealthCheckSelection = ({
  healthCheckOptions,
  setFieldValue,
  setFieldTouched
}: {
  healthCheckOptions: {
    text: string,
    value: string
  }[];
  setFieldValue: FormikProps<{ healthCheckRating: string }>["setFieldValue"];
  setFieldTouched: FormikProps<{ healthCheckRating: string }>["setFieldTouched"];
}) => {
  const field = "healthCheckRating";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };


  return (
    <Form.Field>
      <label>Health Check Rating</label>
      <Dropdown
        fluid
        search
        selection
        options={healthCheckOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};


export const EntryTypeSelection = ({
  entryTypeOptions,
  setFieldValue,
  setFieldTouched,
  handleEntryTypeChange,
  placeholder
}: {
  entryTypeOptions: {
    text: string,
    value: string
  }[];
  setFieldValue: FormikProps<{ selectedEntryType: string }>["setFieldValue"];
  setFieldTouched: FormikProps<{ selectedEntryType: string }>["setFieldTouched"];
  handleEntryTypeChange: (entry: string) => void;
  placeholder: string | undefined
}) => {
  const field = "selectedEntryType";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
    if(data.value && typeof data.value === 'string') handleEntryTypeChange(data.value);
  };


  return (
    <Form.Field>
      <label>Select Entry Type</label>
      <Dropdown
        fluid
        search
        selection
        options={entryTypeOptions}
        onChange={onChange}
        placeholder={placeholder}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};