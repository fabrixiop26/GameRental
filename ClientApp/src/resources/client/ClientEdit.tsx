import {
  DateInput,
  DeleteWithConfirmButton,
  Edit,
  number,
  NumberInput,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
} from "react-admin";
import { getToday, maxDate } from "utils";
import { Stack } from "@mui/material";

const ClientEditActions = () => (
  <Stack direction="row" justifyContent="space-between" mx={2} my={1}>
    <SaveButton />
    <DeleteWithConfirmButton confirmTitle="Delete Client" />
  </Stack>
);

export const ClientEdit = () => (
  <Edit>
    <SimpleForm toolbar={<ClientEditActions />}>
      <TextInput disabled label="Id" source="clientId" />
      <TextInput source="nit" label="NIT" validate={[required(), number()]} />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="address" label="Address" />
      <DateInput
        label="Date of Birth"
        source="dob"
        validate={[required(), maxDate(getToday())]}
      />
    </SimpleForm>
  </Edit>
);
