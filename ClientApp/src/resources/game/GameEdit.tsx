import { DateInput, Edit, NumberInput, required, SimpleForm, TextInput } from "react-admin";

export const GameEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="gameId" />
      <TextInput source="name" validate={[required()]} />
      <TextInput source="company" validate={[required()]} />
      <TextInput source="producer" validate={[required()]} />
      <TextInput source="director" validate={[required()]} />
      <TextInput source="producer" label="Producer"/>
      <NumberInput source="rentPrice" validate={[required()]} />
      <DateInput
        label="Release Date"
        source="releaseDate"
        defaultValue={new Date()}
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);
