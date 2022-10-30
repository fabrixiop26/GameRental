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
        <DateField source="dob" label="Date of Birth" />
        <TextField source="firstName" label="First Name" />
        <TextField source="lastName" label="Last Name" />
        <TextField source="address" label="Address" />
      </SimpleShowLayout>
    </Show>
  );
};
