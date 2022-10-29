import { DateInput, Edit, required, SimpleForm, TextInput } from "react-admin";

export const GameEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="gameId" />
      <TextInput source="name" validate={required()} />
      <TextInput source="director" validate={required()} />
      <DateInput label="Publication date" source="releaseDate" />
    </SimpleForm>
  </Edit>
);
