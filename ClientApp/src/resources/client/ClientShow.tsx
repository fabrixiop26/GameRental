import {
  DateField,
  DeleteButton,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { RentRecord } from "types";

export const ClientShow = () => {
  return (
    <Show>
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
