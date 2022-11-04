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
import { useCallback, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

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

interface CustomSelectInputProps {
  optionText?: string;
  optionValue?: string;
  label?: string;
  emptyValue?: any;
  resource?: string;
  source?: string;
  className?: string;
}

export const CustomSelectInput = (props: CustomSelectInputProps) => {
  const {
    resource: resourceProp,
    source: sourceProp,
    optionText,
    optionValue,
    label,
    emptyValue,
  } = props;
  const {
    allChoices,
    isLoading,
    selectedChoices,
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
    defaultValue: [],
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

  console.log("Value", field.value);

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
        renderValue={(selected: any[]) => {
          /* return (
            <div className={SelectArrayInputClasses.chips}>
              {selected
                .map((item) =>
                  (allChoices || []).find(
                    (choice) => getChoiceValue(choice) === getChoiceValue(item)
                  )
                )
                .filter((item) => !!item)
                .map((item) => (
                  <Chip
                    key={getChoiceValue(item)}
                    label={renderMenuItemOption(item)}
                    className={SelectArrayInputClasses.chip}
                    size="small"
                  />
                ))}
            </div>
          ); */
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((item) => (
                <Chip
                  key={getChoiceValue(item)}
                  label={renderMenuItemOption(item)}
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
