import React, { useEffect, useState } from "react";
import {
  Create,
  DateInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  useChoicesContext,
} from "react-admin";
import { Game, Rent } from "types";
import { getToday, minDate } from "utils";
interface GameSelectorProps {
  onGameSelected(g: Game): void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onGameSelected }) => {
  const { selectedChoices } = useChoicesContext();
  useEffect(() => {
    onGameSelected(selectedChoices[0]);
  }, [selectedChoices]);
  return <SelectInput label="Game" optionText="name" validate={required()} />;
};

export const RentCreate = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const onGameSelected = (p: Game) => {
    setSelectedGame(p);
  };

  // inject rentPrice from select game
  const onPreCreate = (data: Partial<Rent>) => ({
    ...data,
    rentedPrice: selectedGame!.rentPrice,
  });

  return (
    <Create transform={onPreCreate}>
      <SimpleForm>
        <ReferenceInput
          source="gameId"
          reference="games"
          validate={[required()]}
          isRequired
        >
          <GameSelector onGameSelected={onGameSelected} />
        </ReferenceInput>
        <ReferenceInput
          source="clientId"
          reference="clients"
          validate={[required()]}
        >
          <SelectInput label="Client NIT" optionText="nit" />
        </ReferenceInput>
        <DateInput
          label="Rented Date"
          source="rentedDate"
          defaultValue={new Date()}
          validate={[required()]}
          disabled
        />
        <DateInput
          label="Return Date"
          source="returnDate"
          defaultValue={new Date()}
          validate={[required(), minDate(getToday(),"Previous date is not valid")]}
        />
      </SimpleForm>
    </Create>
  );
};
