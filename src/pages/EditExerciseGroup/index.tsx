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
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { ExerciseGroupWithExercises } from "../../types/ExerciseGroupWithExercises";

async function getExercises() {
  const response = await bocaJuniorsAPI.get("/exercise");

  return response.data;
}
const initialExercises: Exercise[] = await getExercises();
console.log("initial exercises", initialExercises);

const ExerciseGroupEditForm: React.FC = () => {
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
  const { id } = useParams();
  const [exerciseGroup, setExerciseGroup] =
  useState<ExerciseGroupWithExercises>();

  const generateExerciseLabel = (exercise: Exercise) => {
    return `${exercise.id} - ${exercise.title} - ${exercise.tag} - ${exercise.difficulty}`
  }

  useEffect(() => {
    async function fetchExerciseGroup() {
      try {        
        const response = await bocaJuniorsAPI.get(`/exercise-group/${id}`);
        console.log("data")
        setExerciseGroup(response.data);    
        console.log("banana") 
      } catch (error) {
        console.error("Error fetching exercise Group:", error);
      }
    }
    if (id) {      
    fetchExerciseGroup()
    }
  }, []);

  useEffect(() => {
    console.log("exercise list: ", exerciseGroup?.exerciseList)
    const tmpUsedExercises: number[] = []
    const tmpDynamicFields: React.SetStateAction<{ id: number; key: number; name: string; }[]> = []
    const tmpFormData = {
        name: exerciseGroup == undefined ? '' : exerciseGroup.name, 
        open: exerciseGroup == undefined ? false : exerciseGroup.open
}
    exerciseGroup?.exerciseList.map(exercise => {  
        console.log("exercise", exercise)      
        tmpUsedExercises.push(exercise.id)
        const newId = tmpDynamicFields.length + 1;
        tmpDynamicFields.push({ key: newId, id: exercise.id, name: generateExerciseLabel(exercise)});
      })
    setUsedExercises(tmpUsedExercises)
    setDynamicFields(tmpDynamicFields)  
    setFormData(tmpFormData)    
  }, [exerciseGroup])

  useEffect(() => {
    const tmp = [
      { label: "", id: -1 },
      ...exercises
        .filter((exercise) => !usedExercises.includes(exercise.id))
        .map((exercise) => ({
          label: generateExerciseLabel(exercise),
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

  const handleDelete = async () => {
    const confirmed = window.confirm('Tem certeza que deseja apagar esse grupo de exercícios?');
    if(confirmed){
        await bocaJuniorsAPI.delete(
            `/exercise-group/${id}`
        );
        navigate(`/exercise-group/`);
    }
  }

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

    const response = await bocaJuniorsAPI.put(`/exercise-group/${id}`, data);

    console.log(response.data);

    navigate(`/exercise-group/${id}`);
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
        <Stack marginTop={"48px"}>

            <Button variant="contained" onClick={handleDelete} color="error" >
                Apagar
                </Button>
        </Stack>
      </Container>
    </>
  );
};

export default ExerciseGroupEditForm;
