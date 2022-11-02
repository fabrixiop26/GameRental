import React from "react";
import {
  ArrayFieldProps,
  ChipField,
  DateField,
  NumberField,
  Show,
  ShowButton,
  SimpleShowLayout,
  TextField,
  useRecordContext,
  useShowContext,
} from "react-admin";
import { GameRecord } from "types";

type PlatformArrayFields = Omit<ArrayFieldProps, "children">;

const TextArrayField: React.FC<PlatformArrayFields> = ({ source }) => {
  const record = useRecordContext();
  if (!record || !source) {
    return null;
  }
  return (
    <React.Fragment>
      {record[source].map((item: string, i: number) => (
        <ChipField label={item} key={item} source={`${source}[${i}]`} />
      ))}
    </React.Fragment>
  );
};

const ShowTitle = () => {
  const record: GameRecord = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>{record.name}</span>;
};

export const GameShow = () => {
  return (
    <Show title={<ShowTitle />}>
      <SimpleShowLayout>
        <TextField source="gameId" />
        <TextField source="name" />
        <DateField source="releaseDate" />
        <TextField source="company" />
        <TextField source="director" />
        <TextField source="producer" />
        <NumberField
          source="rentPrice"
          options={{ style: "currency", currency: "USD" }}
        />
        <TextArrayField source="platforms" />
        <TextArrayField source="characters" />
      </SimpleShowLayout>
    </Show>
  );
};
