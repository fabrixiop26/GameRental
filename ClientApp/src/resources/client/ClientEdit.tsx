import { DateInput, Edit, required, SimpleForm, TextInput } from "react-admin";

export const ClientEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="clientId" />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="address" label="Address" />
      <DateInput label="Date of Birth" source="dob" />
    </SimpleForm>
  </Edit>
);
