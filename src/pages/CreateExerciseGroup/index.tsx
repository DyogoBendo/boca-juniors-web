import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Stack,
  Container,
} from "@mui/material";
import { Exercise } from "../../types/Exercise";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import {
  ExerciseAutocomplete,
  ExerciseGroupTextField,
  FormFieldContainer,
} from "./style";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

async function getExercises() {
  const response = await bocaJuniorsAPI.get("/exercise");

  return response.data;
}
const initialExercises: Exercise[] = await getExercises();
console.log("initial exercises", initialExercises);

const ExerciseGroupForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", open: false });
  const [dynamicFields, setDynamicFields] = useState<
    { id: number; key: number; name: string }[]
  >([]);
  const [exercises] = useState<Exercise[]>(initialExercises);
  const [exercisesOptions, setExercisesOptions] = useState<
    { label: string; id: number }[]
  >([]);
  const [usedExercises, setUsedExercises] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tmp = [
      { label: "", id: -1 },
      ...exercises
        .filter((exercise) => !usedExercises.includes(exercise.id))
        .map((exercise) => ({
          label: `${exercise.title} - ${exercise.tag} - ${exercise.difficulty}`,
          id: exercise.id,
        })),
    ];

    setExercisesOptions(tmp);
  }, [exercises, usedExercises]); // Watch for changes in exercises array

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleAddField = () => {
    const newId = dynamicFields.length + 1;
    setDynamicFields([...dynamicFields, { key: newId, id: -1, name: "" }]);
  };

  const handleDynamicFieldChange = (
    currentField: { id: number; label: string } | null,
    key: number
  ) => {
    //const { value } = event.target;

    if (currentField == null) return;
    console.log("current field", currentField);

    let oldId = -1;
    const updatedFields = dynamicFields.map((field) => {
      let tmp;
      if (field.key === key) {
        oldId = field.id == null ? -1 : field.id;
        tmp = { ...field, name: currentField.label, id: currentField.id };
      } else {
        tmp = field;
      }
      return tmp;
    });
    setDynamicFields(updatedFields);
    setUsedExercises([
      ...usedExercises.filter((exercise) => exercise != oldId),
      currentField.id,
    ]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    console.log("Dynamic Fields:", dynamicFields);

    const data = {
      ...formData,
      exerciseIdList: usedExercises.filter((exercise) => exercise != -1),
    };

    console.log(data);

    const response = await bocaJuniorsAPI.post("/exercise-group", data);

    console.log(response.data);

    navigate(`/exercise-group/${response.data.id}`);
  };

  return (
    <>
      <Header/>
      <Container>
        <form onSubmit={handleSubmit}>
          <FormFieldContainer>
            <ExerciseGroupTextField
              name="name"
              label="Nome"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.open}
                  onChange={handleCheckboxChange}
                  name="open"
                  color="primary"
                />
              }
              label="Aberto"
            />
          </FormFieldContainer>
          {dynamicFields.map((field) => (
            <ExerciseAutocomplete
              options={exercisesOptions}
              value={{ id: field.id, label: field.name }}
              key={field.key}
              onChange={(e, value) => handleDynamicFieldChange(value, field.key)}
              renderInput={(params) => (
                <TextField {...params} label={`Exercício`} />
              )}
            />
          ))}
          <FormFieldContainer>
            <Button variant="contained" onClick={handleAddField}>
              Adicionar exercício
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </FormFieldContainer>
        </form>
      </Container>
    </>
  );
};

export default ExerciseGroupForm;
