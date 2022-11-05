import {
  Create,
  DateInput,
  NumberInput,
  ReferenceArrayInput,
  required,
  SelectArrayInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { getToday, maxDate } from "utils";

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
          validate={[required(), maxDate(getToday())]}
        />
        <ReferenceArrayInput
          source="platformIds"
          reference="platforms"
          label="Platforms"
        >
          <SelectArrayInput optionText="name" optionValue="platformId" />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          source="characterIds"
          reference="characters"
          label="Characters"
        >
          <SelectArrayInput optionText="name" optionValue="platformId" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
