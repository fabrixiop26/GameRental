import {
  DateField,
  DeleteButton,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { ClientRecord, RentRecord } from "types";

const ShowTitle = () => {
  const record: ClientRecord = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return (
    <span>
      Client - {record.firstName} {record.lastName}
    </span>
  );
};

export const ClientShow = () => {
  return (
    <Show title={<ShowTitle />}>
      <SimpleShowLayout>
        <NumberField source="clientId" />
        <TextField source="nit" label="NIT" textAlign="right" />
        <TextField source="firstName" label="First Name" />
        <TextField source="lastName" label="Last Name" />
        <TextField source="address" label="Address" />
        <DateField source="dob" label="Date of Birth" />
      </SimpleShowLayout>
    </Show>
  );
};
