import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { Exercise } from "../../types/Exercise";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";

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
        "testCaseList": dynamicFields
    }
    console.log(data)

    const response = await bocaJuniorsAPI.post("/exercise", data)

    console.log(response.data)
  };

  return (
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
        <>
          <TextField
            multiline
            name={`${field.key}-input`}
            value={field.input}
            key={field.key.toString + "input"}
            label="Input"
            onChange={(e) => handleDynamicFieldInputChange(e, field)}
          />
          <TextField
            multiline
            name={`${field.key}-output`}
            value={field.output}
            key={field.key.toString + "output"}
            label="Output"
            onChange={(e) => handleDynamicFieldOutputChange(e, field)}
          />
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
        </>
      ))}
      <Button variant="contained" onClick={handleAddField}>
        Add Field
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ExerciseForm;
