import axios from "axios";
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
  TopToolbar,
  CreateButton,
  ExportButton,
  Button,
  useNotify,
} from "react-admin";
import { Client } from "types";
import { useNavigate } from "react-router-dom";

const ClientActions = () => {
  let navigate = useNavigate();
  const notify = useNotify();
  const onFindMostFrecuentClient = async () => {
    try {
      const response = await axios.get<Client>("/api/Clients/MostFrecuent");
      navigate(`/clients/${response.data.clientId}/show`);
    } catch (e: any) {
      notify("There are no clients with recorded rents", { type: "error" });
      console.error(e);
    }
  };

  return (
    <TopToolbar>
      <Button label="Most Frecuent" onClick={onFindMostFrecuentClient} />
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};

export const ClientList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false, refetchOnWindowFocus: false }}
      sort={{ field: "clientId", order: "ASC" }}
      actions={<ClientActions />}
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
