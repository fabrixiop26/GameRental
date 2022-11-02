import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  EditButton,
  NumberField,
} from "react-admin";

export const ClientList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false, refetchOnWindowFocus: false }}
      sort={{ field: "clientId", order: "ASC" }}
    >
      <Datagrid bulkActionButtons={false}>
        <NumberField source="clientId" />
        <TextField source="nit" label="NIT" textAlign="right" />
        <TextField source="firstName" label="First Name" />
        <TextField source="lastName" label="Last Name" />
        <TextField source="address" label="Address" />
        <DateField source="dob" label="Date of Birth" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
