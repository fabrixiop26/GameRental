import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  EditButton,
  NumberField,
} from "react-admin";

export const GameList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false }}
      sort={{ field: "gameId", order: "ASC" }}
    >
      <Datagrid bulkActionButtons={false}>
        <NumberField source="gameId" />
        <TextField source="name" />
        <DateField source="releaseDate" />
        <TextField source="company" />
        <TextField source="director" />
        <NumberField
          source="rentPrice"
          options={{ style: "currency", currency: "USD" }}
        />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
