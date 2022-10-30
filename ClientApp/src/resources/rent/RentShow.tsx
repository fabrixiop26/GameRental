import {
  DateField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { RentRecord } from "types";

export const RentShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="rentId" />
        <DateField source="rentedDate" />
        <DateField source="returnDate" />
        <ReferenceField label="Game" reference="games" source="gameId">
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="clientId" />
        <NumberField
          source="rentedPrice"
          options={{ style: "currency", currency: "USD" }}
        />
      </SimpleShowLayout>
    </Show>
  );
};
