import { Labeled, RaRecord } from "react-admin";
import { Typography } from "@mui/material";

interface IdentifierFieldProps {
  label: string;
  record?: RaRecord;
}

export const IdentifierField = ({ label, record }: IdentifierFieldProps) => (
  <Labeled label={label}>
    <Typography>{record?.id}</Typography>
  </Labeled>
);
