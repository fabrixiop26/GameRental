import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  EditButton,
  NumberField,
  TopToolbar,
  FilterButton,
  CreateButton,
  ExportButton,
  Button,
  TextInput,
  useTranslate,
  FilterForm,
  DateInput,
  ListToolbar,
  useNotify,
} from "react-admin";
import { Game } from "types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const gameFilters = [
  <TextInput label="Search by Name" source="name" />,
  <TextInput label="Search by Company" source="company" />,
  <TextInput label="Search by Director" source="director" />,
  <TextInput label="Search by Producer" source="producer" />,
  <DateInput label="Search by Release Date" source="releaseDate_eql" />,
];

const ListActions = () => {
  let navigate = useNavigate();
  const notify = useNotify();
  const onFindMostRentedGame = async () => {
    try {
      const response = await axios.get<Game>("/api/Games/MostRented");
      navigate(`/games/${response.data.gameId}/show`);
    } catch (e: any) {
      notify("There are no games with recorded rents", { type: "error" });
      console.error(e);
    }
  };
  return (
    <TopToolbar>
      <FilterButton filters={gameFilters} />
      <Button onClick={onFindMostRentedGame} label="Most Rented" />
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};

export const GameList = () => {
  return (
    <List
      queryOptions={{ refetchInterval: false }}
      sort={{ field: "gameId", order: "ASC" }}
      filters={gameFilters}
      actions={<ListActions />}
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
