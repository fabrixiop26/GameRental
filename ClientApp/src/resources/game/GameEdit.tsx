import {
  ArrayInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useArrayInput,
  useGetList,
  SelectArrayInput,
} from "react-admin";
import { Game, PlatformRecord } from "types";
import { CustomSelectInput } from "shared";

const PlatformInput = () => {
  /* const editable = useEditContext();
  console.log("editable", editable); */
  return (
    <ArrayInput source="platforms">
      <SimpleFormIterator inline>
        {/* <NumberInput source="platformId" disabled /> */}
        <ReferenceInput source="platformId" reference="platforms">
          <SelectInput optionText="name" optionValue="platformId" />
        </ReferenceInput>
        <TextInput source="name" disabled />
      </SimpleFormIterator>
    </ArrayInput>
  );
};

export const GameEdit = () => {
  const { data: platforms } = useGetList<PlatformRecord>("platforms");

  const idToPlatform = platforms?.reduce(
    (acc, p, i) => ({
      ...acc,
      [i]: p,
    }),
    {} as Record<number, PlatformRecord>
  );

  const onPreSubmit = (d: Game): Game => {
    const transformedGame: Game = {
      ...d,
      platforms: d.platforms.map((p) => ({
        platformId: p.platformId,
        name: platforms!.find((p0) => p0.platformId === p.platformId)!.name,
      })),
    };
    console.log("Transform", transformedGame);
    return transformedGame;
  };
  useArrayInput();
  return (
    <Edit transform={onPreSubmit}>
      <SimpleForm
        onSubmit={(d, e) => {
          console.log("Data", d);
        }}
      >
        <TextInput disabled label="Id" source="gameId" />
        <TextInput source="name" validate={[required()]} />
        <TextInput source="company" validate={[required()]} />
        <TextInput source="producer" validate={[required()]} />
        <TextInput source="director" validate={[required()]} />
        <NumberInput source="rentPrice" validate={[required()]} />
        <DateInput
          label="Release Date"
          source="releaseDate"
          defaultValue={new Date()}
          validate={[required()]}
        />
        <ReferenceArrayInput
          source="platforms"
          reference="platforms"
        >
          <CustomSelectInput optionText="name" optionValue="platformId" />
        </ReferenceArrayInput>
        {/* <FormDataConsumer>
          {({ formData, scopedFormData }) => {
            console.log(formData);
            return null;
          }}
        </FormDataConsumer> */}
      </SimpleForm>
    </Edit>
  );
};
