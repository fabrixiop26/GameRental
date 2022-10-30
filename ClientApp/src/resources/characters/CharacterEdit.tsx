import { DateInput, Edit, required, SimpleForm, TextInput } from "react-admin";

export const ChraracterEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="characterId" />
      <TextInput source="name" validate={required()} label="Name" />
    </SimpleForm>
  </Edit>
);
