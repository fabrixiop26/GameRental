import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  DeleteButton,
} from "react-admin";

export const CharacterList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false, refetchOnWindowFocus: false }}
      sort={{ field: "characterId", order: "ASC" }}
    >
      <Datagrid bulkActionButtons={false}>
        <NumberField source="characterId" />
        <TextField source="name" label="Name" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
