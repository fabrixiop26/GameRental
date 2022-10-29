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
    <List queryOptions={{ refetchInterval: false }}>
      <Datagrid >
        <NumberField source="gameId" />
        <TextField source="name" />
        <DateField source="releaseDate" />
        <TextField source="company" />
        <TextField source="director" />
        <NumberField source="rentPrice" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
