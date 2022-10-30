import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
} from "react-admin";

export const PlatformList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false, refetchOnWindowFocus: false }}
      sort={{ field: "platformId", order: "ASC" }}
    >
      <Datagrid>
        <NumberField source="platformId" />
        <TextField source="Name" label="name" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
