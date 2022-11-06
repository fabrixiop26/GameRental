import {
  Create,
  DateInput,
  Edit,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const CharacterCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} label="Name" />
    </SimpleForm>
  </Create>
);
