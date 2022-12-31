import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { useStateValue } from '../state/';
import {
  DiagnosisSelection,
  TextField,
  SelectEntryField,
  TypeOption,
  HealthOption,
  SelectField,
} from '../AddPatientModal/FormField';
import { EntryWithoutId, HealthCheckRating } from '../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}
const typeOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'HealthCheck' },
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare' },
  { value: 'Hospital', label: 'Hospital' },
];
const healthCheckOptions: HealthOption[] = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
];

const initialEntryTypes: { [key: string]: EntryWithoutId } = {
  Hospital: {
    date: '',
    specialist: '',
    description: '',
    diagnosisCodes: [],
    type: 'Hospital',
    discharge: {
      date: '',
      criteria: '',
    },
  },
  OccupationalHealthcare: {
    date: '',
    specialist: '',
    description: '',
    diagnosisCodes: [],
    type: 'OccupationalHealthcare',
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: '',
    },
  },
  HealthCheck: {
    date: '',
    specialist: '',
    description: '',
    diagnosisCodes: [],
    type: 'HealthCheck',
    healthCheckRating: 0 as HealthCheckRating,
  },
};
const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={initialEntryTypes['Hospital']}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.type === 'Hospital') {
          if (!values.discharge.date || !values.discharge.criteria) {
            errors.discharge = requiredError;
          }
        } else if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        } else {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }
        console.log(errors);
        return errors;
      }}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        values,
        setValues,
      }) => {
        switch (values.type) {
          case 'Hospital':
            return (
              <Form className='form ui'>
                <SelectEntryField
                  label='Type'
                  name='type'
                  options={typeOptions}
                  setValues={setValues}
                  entryType={initialEntryTypes}
                />
                <Field
                  label='Specialist'
                  placeholder='Specialist'
                  name='specialist'
                  component={TextField}
                />
                <Field
                  label='Date'
                  placeholder='YYYY-MM-DD'
                  name='date'
                  component={TextField}
                />
                <Field
                  label='Description'
                  placeholder='Description'
                  name='description'
                  component={TextField}
                />
                <Field
                  label='Discharge Date'
                  placeholder='Discharge Date'
                  name='discharge.date'
                  component={TextField}
                />
                <Field
                  label='Discharge Criteria'
                  placeholder='Discharge Criteria'
                  name='discharge.criteria'
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color='secondary'
                      variant='contained'
                      style={{ float: 'left' }}
                      type='button'
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: 'right',
                      }}
                      type='submit'
                      variant='contained'
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          case 'OccupationalHealthcare':
            return (
              <Form className='form ui'>
                <SelectEntryField
                  label='Type'
                  name='type'
                  options={typeOptions}
                  setValues={setValues}
                  entryType={initialEntryTypes}
                />
                <Field
                  label='Specialist'
                  placeholder='Specialist'
                  name='specialist'
                  component={TextField}
                />
                <Field
                  label='Date'
                  placeholder='YYYY-MM-DD'
                  name='date'
                  component={TextField}
                />
                <Field
                  label='Description'
                  placeholder='Description'
                  name='description'
                  component={TextField}
                />
                <Field
                  label='Employer Name'
                  placeholder='Employer Name'
                  name='employerName'
                  component={TextField}
                />

                <Field
                  label='Sick Leave Start Date'
                  placeholder='Date'
                  name='sickLeave.startDate'
                  component={TextField}
                />
                <Field
                  label='Sick Leave End Date'
                  placeholder='Date'
                  name='sickLeave.endDate'
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color='secondary'
                      variant='contained'
                      style={{ float: 'left' }}
                      type='button'
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: 'right',
                      }}
                      type='submit'
                      variant='contained'
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          case 'HealthCheck':
            return (
              <Form className='form ui'>
                <SelectEntryField
                  label='Type'
                  name='type'
                  options={typeOptions}
                  setValues={setValues}
                  entryType={initialEntryTypes}
                />
                <Field
                  label='Specialist'
                  placeholder='Specialist'
                  name='specialist'
                  component={TextField}
                />
                <Field
                  label='Date'
                  placeholder='YYYY-MM-DD'
                  name='date'
                  component={TextField}
                />
                <Field
                  label='Description'
                  placeholder='Description'
                  name='description'
                  component={TextField}
                />
                <SelectField
                  label='HealthCheckRating'
                  name='healthCheckRating'
                  options={healthCheckOptions}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color='secondary'
                      variant='contained'
                      style={{ float: 'left' }}
                      type='button'
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: 'right',
                      }}
                      type='submit'
                      variant='contained'
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
        }
      }}
    </Formik>
  );
};

export default AddEntryForm;
