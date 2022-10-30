import {
  Create,
  DateInput,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const GameCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <TextInput source="company" validate={[required()]} />
        <TextInput source="producer" validate={[required()]} />
        <TextInput source="director" validate={[required()]} />
        <NumberInput source="rentPrice" validate={[required()]} />
        <DateInput
          label="Release Date"
          source="releaseDate"
          defaultValue={new Date()}
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};
