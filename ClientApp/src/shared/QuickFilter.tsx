import { Chip } from "@mui/material";
import { useTranslate } from "react-admin";

interface QuickFilterProps {
  label: string;
  source: string;
  defaultValue?: any;
}

export const QuickFilter = ({
  label,
  source,
  defaultValue,
}: QuickFilterProps) => {
  const translate = useTranslate();
  return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};
