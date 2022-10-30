import {
  DateField,
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
        <NumberField source="rentId" label="Rent Id" />
        <DateField source="rentedDate" />
        <DateField source="returnDate" />
      </SimpleShowLayout>
    </Show>
  );
};
