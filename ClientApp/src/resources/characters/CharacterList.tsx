import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
} from "react-admin";

export const CharacterList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false, refetchOnWindowFocus: false }}
      sort={{ field: "characterId", order: "ASC" }}
    >
      <Datagrid>
        <NumberField source="characterId" />
        <TextField source="Name" label="name" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
