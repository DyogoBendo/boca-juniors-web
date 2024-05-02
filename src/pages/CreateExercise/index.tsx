import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Stack,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { Exercise } from "../../types/Exercise";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { FormFieldContainer } from "../CreateExerciseGroup/style";
import { DataTextField, TestCaseTextField } from "./style";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

interface DynamicFieldI {
  key: number;
  input: string;
  output: string;
  example: boolean;
}

const ExerciseForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    difficulty: "",
    sourceCode: "",
  });
  const navigate = useNavigate();
  const [dynamicFields, setDynamicFields] = useState<DynamicFieldI[]>([]);

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
    setDynamicFields([
      ...dynamicFields,
      { key: newId, input: "", output: "", example: false },
    ]);
  };

  const handleDynamicFieldInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { key, input, output, example }: DynamicFieldI
  ) => {
    const value = e.target.value;
    const updatedFields = dynamicFields.map((field) =>
      field.key === key ? { ...field, input: value } : field
    );
    setDynamicFields(updatedFields);
  };

  const handleDynamicFieldOutputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { key, input, output, example }: DynamicFieldI
  ) => {
    const value = e.target.value;
    const updatedFields = dynamicFields.map((field) =>
      field.key === key ? { ...field, output: value } : field
    );
    setDynamicFields(updatedFields);
  };

  const handleDynamicFieldExampleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { key, input, output, example }: DynamicFieldI
  ) => {
    const value = e.target.checked;
    const updatedFields = dynamicFields.map((field) =>
      field.key === key ? { ...field, example: value } : field
    );
    setDynamicFields(updatedFields);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    console.log("Dynamic Fields:", dynamicFields);
    const data = {
      ...formData,
      testCaseList: dynamicFields,
    };
    console.log(data);

    const response = await bocaJuniorsAPI.post("/exercise", data);

    console.log(response.data);
    navigate(`/exercise/${response.data.id}`);
  };

  return (
    <>
      <Header/>
      <Container>
        <Typography variant="h5" marginTop={"24px"}>
          Criar Exercício
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Título"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Descrição"
            multiline
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="tag"
            label="Tag"
            value={formData.tag}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="sourceCode"
            label="Código Fonte"
            multiline
            value={formData.sourceCode}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="difficulty"
            label="Dificuldade"
            value={formData.difficulty}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {dynamicFields.map((field) => (
            <Stack
              border={1}
              borderRadius={2}
              borderColor={"#5555"}
              padding={"8px 16px"}
              margin={"16px 0"}
            >
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  color={"#0000009d"}
                  variant="h6"
                >{`Caso de teste ${field.key}`}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={`${field.key}-example`}
                      checked={field.example}
                      key={field.key.toString + "example"}
                      onChange={(e) => handleDynamicFieldExampleChange(e, field)}
                    />
                  }
                  label="Exemplo"
                />
              </Stack>
              <Grid container marginTop={"8px"} columnSpacing={{ xs: 1 }}>
                <Grid item xs={6}>
                  <TestCaseTextField
                    multiline
                    name={`${field.key}-input`}
                    value={field.input}
                    key={field.key.toString + "input"}
                    label="Input"
                    onChange={(e) => handleDynamicFieldInputChange(e, field)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TestCaseTextField
                    fullWidth
                    multiline
                    name={`${field.key}-output`}
                    value={field.output}
                    key={field.key.toString + "output"}
                    label="Output"
                    onChange={(e) => handleDynamicFieldOutputChange(e, field)}
                  />
                </Grid>
              </Grid>
            </Stack>
          ))}
          <FormFieldContainer>
            <Button variant="contained" onClick={handleAddField} color="primary">
              Adicionar Caso de teste
            </Button>
            <Button type="submit" variant="contained" color="success">
              Salvar
            </Button>
          </FormFieldContainer>
        </form>
      </Container>
    </>
  );
};

export default ExerciseForm;
