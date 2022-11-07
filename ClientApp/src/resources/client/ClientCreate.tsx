import {
  Create,
  DateInput,
  minLength,
  number,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { getToday, maxDate } from "utils";

export const ClientCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" validate={[required(), minLength(2)]} />
      <TextInput source="lastName" validate={[required(), minLength(2)]} />
      <TextInput
        source="nit"
        label="NIT"
        validate={[required(), number(), minLength(7)]}
      />
      <TextInput source="address" label="Address" validate={minLength(10)} />
      <DateInput
        label="Date of Birth"
        source="dob"
        validate={[required(), maxDate(getToday(), "Can't use future date")]}
      />
    </SimpleForm>
  </Create>
);
