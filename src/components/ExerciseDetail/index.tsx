import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import bocaJuniorsAPI from "../../shared/boca-juniors-api";
import { Exercise } from "../../types/Exercise";
import { ExerciseWithExamples } from "../../types/ExerciseWithExamples";
import {
  ContentContainer,
  ExerciseContainer,
  ExerciseTestCaseContainer,
  ExerciseTestCaseDataContainer
} from "./style";

export default function ExerciseDetail() {
  const { id } = useParams();
  const [exercise, setExercise] = useState<ExerciseWithExamples>();

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
    <ContentContainer>
      {exercise && (
        <ExerciseContainer>
          <Typography variant="h1" gutterBottom>
            {exercise.title}
          </Typography>

          <Typography variant="body1" gutterBottom>
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
        </ExerciseContainer>
      )}
    </ContentContainer>
  );
}
