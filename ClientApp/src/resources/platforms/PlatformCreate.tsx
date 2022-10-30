import {
  Create,
  DateInput,
  Edit,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const PlatformCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} label="Name" />
    </SimpleForm>
  </Create>
);
