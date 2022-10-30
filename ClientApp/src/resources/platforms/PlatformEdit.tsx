import { DateInput, Edit, required, SimpleForm, TextInput } from "react-admin";

export const PlatformEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="platformId" />
      <TextInput source="name" validate={required()} label="Name" />
    </SimpleForm>
  </Edit>
);
