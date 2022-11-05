import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  EditButton,
  NumberField,
  TextInput,
  DateInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

const gameFilters = [
  <TextInput label="Search by Company" source="company" />,
  <TextInput label="Search by Director" source="director" />,
  <TextInput label="Search by Producer" source="producer" />,
  <DateInput label="Search by Release Date" source="releaseDate_eql" />,
  <ReferenceArrayInput
    source="characterIds"
    reference="characters"
    label="Search by Characters"
  >
    <SelectArrayInput optionText="name" optionValue="characterId" />
  </ReferenceArrayInput>,
  <ReferenceArrayInput
    source="platformIds"
    reference="platforms"
    label="Search by Platforms"
  >
    <SelectArrayInput optionText="name" optionValue="platformId" />
  </ReferenceArrayInput>,
];

export const GameList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false }}
      sort={{ field: "gameId", order: "ASC" }}
      filters={gameFilters}
    >
      <Datagrid bulkActionButtons={false}>
        <NumberField source="gameId" />
        <TextField source="name" />
        <DateField source="releaseDate" />
        <TextField source="company" />
        <TextField source="director" />
        <TextField source="producer" />
        <NumberField
          source="rentPrice"
          options={{ style: "currency", currency: "USD" }}
        />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
