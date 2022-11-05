import {
  ArrayInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useArrayInput,
  useGetList,
  SelectArrayInput,
  DeleteWithConfirmButton,
  TopToolbar,
  ShowButton,
  SaveButton,
  useRecordContext,
} from "react-admin";
import { Game, GameRecord, PlatformRecord } from "types";
import { CustomSelectInput } from "shared";
import { Stack } from "@mui/material";

const GameEditActions = () => (
  <Stack direction="row" justifyContent="space-between" mx={2} my={1}>
    <SaveButton />
    <DeleteWithConfirmButton confirmTitle="Delete Game" />
  </Stack>
);

const ShowTitle = () => {
  const record: GameRecord = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>Edit - {record.name}</span>;
};

export const GameEdit = () => {
  return (
    <Edit title={<ShowTitle />}>
      <SimpleForm toolbar={<GameEditActions />}>
        <TextInput disabled label="Id" source="gameId" />
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
        <ReferenceArrayInput source="platforms" reference="platforms">
          <CustomSelectInput optionText="name" optionValue="platformId" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
