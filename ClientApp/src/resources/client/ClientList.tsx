import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  EditButton,
  NumberField,
  ReferenceField,
  ReferenceOneField,
} from "react-admin";

export const ClientList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false, refetchOnWindowFocus: false }}
      sort={{ field: "clientId", order: "ASC" }}
    >
      <Datagrid>
        <NumberField source="clientId" />
        <DateField source="dob" label="Date of Birth" />
        <TextField source="firstName" label="First Name" />
        <TextField source="lastName" label="Last Name" />
        <TextField source="address" label="Address" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
