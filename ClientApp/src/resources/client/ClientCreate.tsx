import {
  Create,
  DateInput,
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
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="nit" label="NIT" validate={[required(), number()]} />
      <TextInput source="address" label="Address" />
      <DateInput
        label="Date of Birth"
        source="dob"
        validate={[required(), maxDate(getToday())]}
      />
    </SimpleForm>
  </Create>
);
