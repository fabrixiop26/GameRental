import { Card, CardContent, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Form, Link, Title } from "react-admin";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Client, Game, Rent } from "types";
import { useQuery } from "react-query";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

interface AgeFilter {
  minAge: number;
  maxAge: number;
}

const StatsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgeFilter>();
  const [leastRentedGame, setLeastRentedGame] = useState<Game | null>(null);
  const onSubmit = async (data: AgeFilter) => {
    const res = await axios.get<Game>("/api/Rents/LeastRentedGameByAge", {
      params: {
        minAge: data.minAge,
        maxAge: data.maxAge,
      },
    });
    setLeastRentedGame(res.data);
  };
  const {
    isLoading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery<Client>({
    queryKey: ["MostFrecuentClint"],
    staleTime: Infinity,
    queryFn: () =>
      axios.get<Client>("/api/Clients/MostFrecuent").then((res) => res.data),
  });

  const {
    isLoading: gameLoading,
    error: gameError,
    data: gameData,
  } = useQuery<Game>({
    queryKey: ["MostRentedGame"],
    staleTime: Infinity,
    queryFn: () =>
      axios.get<Game>("/api/Games/MostRented").then((res) => res.data),
  });

  return (
    <Card>
      <Title title="Stats" />
      <CardContent>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Most Frecuent Client</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {clientError ? (
              `There was an error`
            ) : (
              <Link to={`/clients/${clientData?.clientId}/show`}>
                <Typography>
                  {clientData?.firstName} {clientData?.lastName}
                </Typography>
              </Link>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Most Rented Game</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {gameError ? (
              `There was an error`
            ) : (
              <Link to={`/games/${gameData?.gameId}/show`}>
                <Typography>{gameData?.name}</Typography>
              </Link>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Least Rented Game by Age</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" mb={1}>
                <TextField
                  id="minAge"
                  label="From"
                  variant="outlined"
                  type="number"
                  {...register("minAge", { min: 1, max: 99, required: true })}
                  error={!!errors.minAge}
                  helperText={errors.minAge ? "Invalid Value" : ""}
                />
                <TextField
                  id="maxAge"
                  label="To"
                  variant="outlined"
                  type="number"
                  {...register("maxAge", { min: 2, max: 100, required: true })}
                  error={!!errors.maxAge}
                  helperText={errors.maxAge ? "Invalid Value" : ""}
                />
              </Stack>
              <Button label="Find" variant="contained" type="submit" />
            </form>
            <br />
            {leastRentedGame ? (
              <Link to={`/games/${leastRentedGame.gameId}/show`}>
                <Typography>{leastRentedGame.name}</Typography>
              </Link>
            ) : "No Game Found"}
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default StatsPage;
