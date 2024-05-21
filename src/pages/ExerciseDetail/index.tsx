import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { Exercise } from "../../types/Exercise";
import { ExerciseWithExamples } from "../../types/ExerciseWithExamples";
import {
  ContentContainer,
  ExerciseContainer,
  ExerciseTestCaseContainer,
  ExerciseTestCaseDataContainer,
} from "./style";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useUser } from "../../context/auth";

export default function ExerciseDetail() {
  const { id } = useParams();
  const [exercise, setExercise] = useState<ExerciseWithExamples>();
  const [formData, setFormData] = useState({ sourceCode: "" });
  const { user, setUser } = useUser();
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    const data = {
      ...formData,
      username: user,
      exerciseId: id
    };

    console.log("data", data)

    const response = await bocaJuniorsAPI.post("/submission", data);

    navigate("/submission")
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    async function fetchExercise() {
      try {
        const response = await bocaJuniorsAPI.get(`/exercise/${id}`);
        console.log("oi", response.data);
        setExercise(response.data);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    }

    if (id) {
      fetchExercise();
    }
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        <ContentContainer>
          {exercise && (
            <ExerciseContainer>
              <Typography variant="h1" gutterBottom>
                {exercise.title}
              </Typography>

              <Typography variant="body1" style={{ whiteSpace: 'pre-line' }} gutterBottom>
                {exercise.description}
              </Typography>
              {exercise.examples.map((example) => (
                <ExerciseTestCaseContainer key={example.input}>
                  <ExerciseTestCaseDataContainer>
                    <Typography variant="h6">Entrada</Typography>
                    <Typography
                      sx={{ whiteSpace: "pre-line" }}
                      variant="body1"
                      gutterBottom
                    >
                      {example.input}
                    </Typography>
                  </ExerciseTestCaseDataContainer>
                  <ExerciseTestCaseDataContainer>
                    <Typography variant="h6">Saída</Typography>
                    <Typography
                      sx={{ whiteSpace: "pre-line" }}
                      variant="body1"
                      gutterBottom
                    >
                      {example.output}
                    </Typography>
                  </ExerciseTestCaseDataContainer>
                </ExerciseTestCaseContainer>
              ))}

              <Stack width={"100%"}  >
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="sourceCode"
                    label="Código Fonte"
                    multiline
                    value={formData.sourceCode}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <Button fullWidth type="submit" variant="contained" color="success">
                    Enviar
                  </Button>                  
                </form>
              </Stack>
            </ExerciseContainer>
          )}
        </ContentContainer>
      </Container>
    </>
  );
}
