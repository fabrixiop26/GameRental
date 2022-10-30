import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  DeleteButton,
  DeleteWithConfirmButton,
} from "react-admin";

export const PlatformList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false, refetchOnWindowFocus: false }}
      sort={{ field: "platformId", order: "ASC" }}
    >
      <Datagrid bulkActionButtons={false}>
        <NumberField source="platformId" />
        <TextField source="name" label="Name" />
        <EditButton />
        <DeleteWithConfirmButton />
      </Datagrid>
    </List>
  );
};
