import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  DateInput,
  Labeled,
  NumberField,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useChoicesContext,
  useCreateContext,
} from "react-admin";
import { useController } from "react-hook-form";
import { Game } from "types";
import TextField from "@mui/material/TextField";

interface GameSelectorProps {
  onGameSelected(g: Game): void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onGameSelected }) => {
  const { selectedChoices } = useChoicesContext();
  useEffect(() => {
    onGameSelected(selectedChoices[0]);
  }, [selectedChoices]);
  return <AutocompleteInput label="Title" optionText="name" />;
};

/* const RentInput = ({ rentPrice }: { rentPrice: number }) => {
  const {
    field,
    fieldState: { error, isTouched, isDirty },
    formState: { isSubmitted },
  } = useController({ name: "", defaultValue: rentPrice });
  return (
    <TextField {...field} label="Rent Price" error={!!error} type="number" disabled/>
  );
}; */

const RentInput = ({ rentPrice }: { rentPrice: number }) => {
  return (
    <NumberInput label="Rented Price" value={rentPrice} source="rentedPrice" />
  );
};

export const RentCreate = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const onGameSelected = (p: Game) => {
    setSelectedGame(p);
  };
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput
          source="gameId"
          reference="games"
          validate={[required()]}
        >
          <GameSelector onGameSelected={onGameSelected} />
        </ReferenceInput>
        <RentInput rentPrice={selectedGame?.rentPrice || 0} />
        <NumberInput
          label="Client Id"
          source="clientId"
          min={0}
          isRequired
          validate={[required()]}
          disabled
        />
        <DateInput
          label="Rented Date"
          source="rentedDate"
          defaultValue={new Date()}
          validate={[required()]}
        />
        <DateInput
          label="Return Date"
          source="returnDate"
          defaultValue={new Date()}
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};
