import {
  Create,
  DateInput,
  number,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ClientCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="nit" label="NIT" validate={[required(), number()]} />
      <TextInput source="address" label="Address" />
      <DateInput label="Date of Birth" source="dob" defaultValue={new Date()} />
    </SimpleForm>
  </Create>
);
