import { styled } from "@mui/material/styles";
import clsx from "clsx";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Chip,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import {
  ChoicesContextProvider,
  ChoicesContextValue,
  FieldTitle,
  InputHelperText,
  Labeled,
  LinearProgress,
  RaRecord,
  ReferenceArrayInputProps,
  ResourceContextProvider,
  useChoices,
  useChoicesContext,
  useGetList,
  useGetManyAggregate,
  useGetRecordRepresentation,
  useInput,
  UseReferenceArrayInputParams,
  useSupportCreateSuggestion,
} from "react-admin";
import React, { useCallback, useEffect, useRef, useState } from "react";

const PREFIX = "RaSelectArrayInput";

export const SelectArrayInputClasses = {
  chips: `${PREFIX}-chips`,
  chip: `${PREFIX}-chip`,
};

const StyledFormControl = styled(FormControl, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  minWidth: theme.spacing(20),
  [`& .${SelectArrayInputClasses.chips}`]: {
    display: "flex",
    flexWrap: "wrap",
  },

  [`& .${SelectArrayInputClasses.chip}`]: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

interface RecordSelectInputProps {
  optionText?: string;
  optionValue?: string;
  label?: string;
  emptyValue?: any;
  resource?: string;
  source?: string;
  className?: string;
}

export const RecordSelectInput = (props: RecordSelectInputProps) => {
  const {
    resource: resourceProp,
    source: sourceProp,
    optionText,
    optionValue = "id",
    label,
    emptyValue,
  } = props;
  const {
    allChoices,
    isLoading,
    error: fetchError,
    source,
    resource,
    isFromReference,
  } = useChoicesContext({
    resource: resourceProp,
    source: sourceProp,
  });
  const getRecordRepresentation = useGetRecordRepresentation(resource);
  const { getChoiceText, getChoiceValue, getDisableValue } = useChoices({
    optionText:
      optionText ?? (isFromReference ? getRecordRepresentation : undefined),
    optionValue,
  });

  const {
    field,
    fieldState,
    id,
    isRequired,
    formState: { isSubmitted },
  } = useInput({
    resource,
    source,
  });

  const { error, invalid, isTouched } = fieldState;
  const renderMenuItemOption = useCallback(
    (choice: any) => getChoiceText(choice),
    [getChoiceText]
  );

  const handleChange = useCallback(
    async (eventOrChoice: React.ChangeEvent<HTMLInputElement> | RaRecord) => {
      // We might receive an event from the mui component
      // In this case, it will be the choice id
      if (eventOrChoice?.target) {
        field.onChange(eventOrChoice);
      } else {
        // Or we might receive a choice directly, for instance a newly created one
        field.onChange([...(field.value || []), getChoiceValue(eventOrChoice)]);
      }
    },
    [field, getChoiceValue]
  );

  const { handleChange: handleMultipleChange } = useSupportCreateSuggestion({
    handleChange,
    optionText,
  });
  // render menu
  const renderMenuItem = useCallback(
    (choice: any) => {
      return choice ? (
        <MenuItem
          key={getChoiceValue(choice)}
          value={choice}
          disabled={getDisableValue(choice)}
        >
          {renderMenuItemOption(choice)}
        </MenuItem>
      ) : null;
    },
    [getChoiceValue, getDisableValue, renderMenuItemOption]
  );

  const inputLabel = useRef(null);

  const filterValues = () =>
    (allChoices || []).filter((p: RaRecord) =>
      field.value.some((ap: RaRecord) => ap[optionValue] === p[optionValue])
    );

  const [selectedValues, setSelectedValues] = useState<RaRecord[]>(
    filterValues()
  );

  useEffect(() => {
    setSelectedValues(filterValues());
  }, [field.value, allChoices]);

  if (isLoading) {
    return (
      <Labeled
        label={label}
        source={source}
        resource={resource}
        className={clsx("ra-input", `ra-input-${source}`, props.className)}
        isRequired={isRequired}
      >
        <LinearProgress />
      </Labeled>
    );
  }

  return (
    <StyledFormControl
      className={clsx("ra-input", `ra-input-${source}`, props.className)}
      error={fetchError || ((isTouched || isSubmitted) && invalid)}
    >
      <InputLabel ref={inputLabel} id={`${label}-outlined-label`}>
        <FieldTitle
          label={label}
          source={source}
          resource={resource}
          isRequired={isRequired}
        />
      </InputLabel>
      <Select
        id={id}
        autoWidth
        labelId={`${label}-outlined-label`}
        multiple
        error={!!fetchError || ((isTouched || isSubmitted) && invalid)}
        renderValue={(selectedIds: any[]) => {
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedIds.map((item) => (
                <Chip
                  key={getChoiceValue(item)}
                  label={getChoiceText(item)}
                  className={SelectArrayInputClasses.chip}
                  size="small"
                />
              ))}
            </Box>
          );
        }}
        data-testid="selectArray"
        size="small"
        {...field}
        value={selectedValues}
        onChange={handleMultipleChange}
      >
        {allChoices.map(renderMenuItem)}
      </Select>
      <FormHelperText error={fetchError || (isTouched && !!error)}>
        <InputHelperText
          touched={isTouched || isSubmitted || fetchError}
          error={error?.message || fetchError?.message}
        />
      </FormHelperText>
    </StyledFormControl>
  );
};
