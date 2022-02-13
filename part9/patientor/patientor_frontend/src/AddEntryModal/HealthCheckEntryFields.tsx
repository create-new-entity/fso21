import React from "react";
import { FormikErrors, FormikProps, FormikTouched } from "formik";
import { HealthCheckSelection } from "./FormField";
import { HealthCheckRating, NewHealthCheckEntry } from "../types";

interface Props {
  errors: FormikErrors<NewHealthCheckEntry>;
  touched: FormikTouched<NewHealthCheckEntry>;
  setFieldValue: FormikProps<{ healthCheckRating: string }>["setFieldValue"];
  setFieldTouched: FormikProps<{ healthCheckRating: string }>["setFieldTouched"];
}

const HealthCheckEntryFields = ({
  errors, touched, setFieldValue, setFieldTouched
}: Props) => {
  const healthCheckEnumStuffs = Object.keys(HealthCheckRating);
  const healthCheckEnumValues = healthCheckEnumStuffs.slice(
    0,
    healthCheckEnumStuffs.length / 2
  );
  const healthCheckEnumKeys = healthCheckEnumStuffs.slice(
    healthCheckEnumStuffs.length / 2
  );
  const healthCheckDropDownOptions = healthCheckEnumKeys.map((key, index) => ({
    text: key,
    value: healthCheckEnumValues[index],
  }));
  
  return (
    <>
      <HealthCheckSelection
        healthCheckOptions={healthCheckDropDownOptions}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
      />
      
      {
        errors.healthCheckRating && touched.healthCheckRating ? (
          <div>{errors.healthCheckRating}</div>
        ) : null
      }
    </>
  );
};

export default HealthCheckEntryFields;