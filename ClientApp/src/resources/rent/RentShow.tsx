import {
  DateField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const RentShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="rentId" />
        <DateField source="rentedDate" />
        <DateField source="returnDate" />
        <ReferenceField reference="games" source="gameId" link="show">
          <TextField source="name" label="Game" />
        </ReferenceField>
        <ReferenceField reference="clients" source="clientId" link="show">
          <TextField source="nit" label="Client NIT" />
        </ReferenceField>
        <NumberField
          source="rentedPrice"
          options={{ style: "currency", currency: "USD" }}
        />
      </SimpleShowLayout>
    </Show>
  );
};
