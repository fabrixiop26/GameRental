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
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import { QuickFilter } from "shared";
import { getToday } from "utils";

const rentFilters = [
  <QuickFilter
    source="returnDate_lte"
    label="Expired"
    defaultValue={getToday()}
  />,
  <QuickFilter
    source="rentedDate_gte"
    label="Today"
    defaultValue={getToday()}
  />,
];

export const RentList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false, refetchOnWindowFocus: false }}
      sort={{ field: "rentId", order: "ASC" }}
      filters={rentFilters}
    >
      <Datagrid bulkActionButtons={false}>
        <NumberField source="rentId" />
        <DateField source="rentedDate" />
        <DateField source="returnDate" />
        <NumberField source="gameId" label="Game Id" />
        <NumberField source="clientId" label="Client Id" />
        <NumberField
          source="rentedPrice"
          options={{ style: "currency", currency: "USD" }}
        />
        <ShowButton />
      </Datagrid>
    </List>
  );
};
